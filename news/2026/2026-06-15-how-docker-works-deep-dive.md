---
title: "How Docker Actually Works: From CLI to Linux Kernel"
excerpt: "A deep dive into the Docker runtime stack, Linux namespaces, and the kernel primitives that make containers possible."
publishedAt: "2026-06-14"
slug: "how-docker-works-deep-dive"
hashtags: "#NeoKim #Docker #Containers #Linux #DevOps #CloudNative #generated #en"
source_pattern: "NeoKim"
---

## How Docker Works - A Deep Dive

**TLDR:** Docker is not one program — it is a layered stack of cooperating components, each with a specific responsibility, passing work down to the Linux kernel. Containers themselves are a Linux kernel feature, not a Docker feature. Understanding the full chain from CLI to runc to namespaces changes how you think about everything in modern infrastructure.

**Summary:**

You have heard it before: "it works on my machine." And for a long time, virtual machines were the band-aid. You packaged an entire OS alongside your app. It worked, but the weight was punishing — each VM hauled its own kernel, its own services, its own overhead. The industry needed isolation without the full OS tax, and it turned out Linux already had the pieces: namespaces to isolate processes, cgroups to constrain resource consumption. Docker did not invent containers. It made the low-level kernel primitives usable by normal humans.

When you type docker run, you are talking to a thin CLI client that converts your command into an HTTP request and sends it over a Unix socket to dockerd. The daemon is the orchestration layer — it handles images, networks, volumes, and the Docker API surface. But dockerd does not run containers. It hands that work to containerd, which was donated to the CNCF in 2017 and now sits underneath Kubernetes too. Containerd delegates further: before a container starts, it spawns a containerd-shim process that becomes the container's parent and keeps it alive even if containerd itself restarts. The shim then calls runc, the OCI runtime that actually talks to the Linux kernel to create namespaces and cgroups, sets up the filesystem, and starts the process. After runc does its job, it exits. The shim takes over supervision. That is the full chain.

The isolation engineers rely on comes from six Linux namespaces working together. PID namespace gives the container its own process numbering — the first process inside sees itself as PID 1 and cannot see anything on the host. Network namespace gives each container its own network stack, its own IP, its own ports — that is how ten containers can each bind to port 80 simultaneously without conflict. Mount namespace controls the filesystem view, giving each container its own root backed by OverlayFS layers. UTS namespace provides a clean hostname identity. IPC namespace prevents cross-container shared memory interference. User namespace is the most powerful one: it maps root inside the container to an unprivileged user on the host, which is what makes rootless containers possible and limits the blast radius of a container escape.

The OCI standards story is worth a moment. Before the Open Container Initiative standardized image and runtime formats, container tooling was tightly coupled to Docker. Now Docker-built images run unchanged on containerd, CRI-O, and Podman. Kubernetes can swap runtimes without touching the rest of the stack. That modularity is genuinely good for the ecosystem and it happened because someone decided to standardize the interfaces rather than own them.

One thing the article highlights but does not belabor: PID 1 inside a container carries real responsibilities. It has to handle signals and reap zombie processes. A lot of containers run an application directly as PID 1 without thinking about this, and then wonder why SIGTERM does not gracefully shut things down. It is a small design decision with outsized operational consequences.

**Key takeaways:**
- Docker CLI is a thin HTTP client — all real work happens in dockerd, containerd, containerd-shim, and runc
- Containers are Linux kernel features (namespaces + cgroups), not Docker features
- Six namespaces combine to create isolation: PID, network, mount, UTS, IPC, user
- User namespaces enable rootless containers and limit container escape damage
- OCI standardization decoupled container runtimes from Docker, enabling Kubernetes to work with containerd directly
- runc exits after starting the container process — the shim supervises from that point on
- What runs as PID 1 in a container matters: signal handling and zombie reaping are its responsibility

**Why do I care:** For frontend architects and senior devs, this level of Docker internals is relevant any time you are designing CI/CD pipelines, debugging container networking issues, or making decisions about base images and process supervision. Knowing that containerd is what Kubernetes actually talks to — not Docker — clarifies why "dockerd not required in Kubernetes since 1.24" was not a catastrophe. Understanding user namespaces informs security decisions around running containers as root in development. And knowing the shim architecture explains why containers survive daemon restarts, which matters when you are sizing your deployment infrastructure. This is the mental model that separates engineers who operate containers from engineers who understand them.

**Link:** [How Docker Works - A Deep Dive](https://newsletter.systemdesign.one/p/how-do-docker-containers-work?publication_id=1511845&post_id=199306668&isFreemail=true&triedRedirect=true)
