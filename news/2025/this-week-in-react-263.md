---
title: "This Week In React: Security Vulnerabilities, RSC Explorer, Base UI, and More"
excerpt: "This week's edition covers a critical security vulnerability in React Server Components, the new RSC Explorer, the launch of Base UI, and other news from the React and web development ecosystem."
publishedAt: "2025-12-18"
slug: "this-week-in-react-263"
hashtags: "#thisweekinreact #react #reactnative #rsc #security #webdev #generated #en"
---

## React Security Vulnerability

**TLDR:** A critical security vulnerability has been discovered in React Server Components, leading to potential Denial of Service and Source Code Exposure. Immediate upgrades are recommended.

**Summary:**
The React team has disclosed two new vulnerabilities in React Server Components, following the critical vulnerability discovered last week. The new vulnerabilities are a high-severity Denial of Service (DoS) issue and a medium-severity Source Code Exposure issue. The React team has released patches and recommends immediate upgrades for all users of affected packages. The affected packages include `react-server-dom-webpack`, `react-server-dom-parcel`, and `react-server-dom-turbopack`. Frameworks like Next.js have also released updates to address the vulnerability. This is a developing story and a stark reminder of the security challenges in the modern web development landscape.

**Link:** [Denial of Service and Source Code Exposure in React Server Components – React](https://react.dev/blog/2025/12/11/denial-of-service-and-source-code-exposure-in-react-server-components)

## Introducing RSC Explorer

**TLDR:** Dan Abramov has released RSC Explorer, a new tool for exploring the React Server Components (RSC) protocol.

**Summary:**
In the wake of the recent security vulnerabilities, there has been a surge of interest in understanding the inner workings of React Server Components. To help developers get a better grasp of the RSC protocol, Dan Abramov has created RSC Explorer. This interactive tool allows you to see how React components are serialized and deserialized as they cross the network. It's a great way to build an intuition for how RSC works under the hood, and it provides a hands-on way to learn about the protocol without having to dig through the React source code.

**Link:** [Introducing RSC Explorer — overreacted](https://overreacted.io/introducing-rsc-explorer/)

## Base UI

**TLDR:** A new unstyled UI component library, Base UI, has been launched by the creators of Radix, Floating UI, and Material UI.

**Summary:**
Base UI is a new, comprehensive library of unstyled UI components for React. It's designed to provide a solid, accessible foundation for building user interfaces, without imposing any specific visual style. The library is built by a team of experienced component library developers, including the creators of Radix, Floating UI, and Material UI. Base UI prioritizes flexibility, composability, and accessibility, making it a great choice for teams that want to build distinctive, reliable, and future-proof interfaces.

**Link:** [Base UI](https://base-ui.com/)

## React Compiler’s Silent Failures (And How to Fix Them)

**TLDR:** The React Compiler can fail silently, which can lead to performance issues and bugs. This article explains how to use an undocumented ESLint rule to detect these failures and break your build.

**Summary:**
The React Compiler is a powerful tool that can significantly improve the performance of your React applications by automatically memoizing components. However, when the compiler is unable to compile a component, it fails silently, which can lead to unexpected performance regressions. This article explains how to enable an undocumented ESLint rule, `react-hooks/todo`, to catch these silent failures and break your build. By making these failures visible, you can make conscious decisions about which components need to be compiled and which can be left as-is, giving you the best of both worlds: the performance benefits of the compiler and the clarity of your code.

**Link:** [React Compiler’s Silent Failures (And How to Fix Them) | acusti.ca](https://acusti.ca/blog/2025/12/16/react-compiler-silent-failures-and-how-to-fix-them/)

## Driving 3D scenes in Blender with React

**TLDR:** A fun exploration of using React to create and manage 3D scenes in Blender, using a custom React reconciler.

**Summary:**
This article showcases a fascinating experiment in using React's declarative programming model to control 3D scenes in Blender. The author embeds a JavaScript engine into Blender and uses a custom React reconciler to map React components to Blender objects. This allows for defining scenes with familiar React patterns, including using components for materials and animations. It's a great example of the flexibility of React's architecture and how it can be applied in unexpected and creative ways.

**Link:** [Driving 3D scenes in Blender with React | Roman Liutikov, Software Engineer](https://romanliutikov.com/blog/driving-3d-scenes-in-blender-with-react)

## State of React Native 2025

**TLDR:** The 2025 State of React Native survey is now open. This year's survey celebrates 10 years of React Native and focuses on topics that are unique to the React Native ecosystem.

**Summary:**
The annual State of React Native survey is back for 2025. This year marks the 10th anniversary of React Native, and the survey aims to capture the current state of the ecosystem. The survey is more focused this year, with some questions about state management and data fetching removed to avoid overlap with the State of React survey. Your participation helps shape the future of React Native, so be sure to take the survey and make your voice heard.

**Link:** [State of React Native 2025](https://survey.2025.stateofreactnative.com/)

## State of HTML 2025

**TLDR:** The 2025 State of HTML survey is now open. This survey aims to get a picture of the current state of the web platform and the features that developers are using and struggling with.

**Summary:**
The State of HTML survey is back for its 2025 edition. The survey covers a wide range of topics, from forms and graphics to performance and accessibility. This year, the survey has a renewed focus on analyzing the freeform answers to pain point questions, allowing for a deeper understanding of the challenges that web developers face. If you want to have your say on the future of the web platform, be sure to participate in the survey.

**Link:** [State of HTML 2025](https://2025.stateofhtml.com/en-US)
