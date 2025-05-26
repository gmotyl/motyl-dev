import Image from "next/image"

const components = {
  img: (props: any) => <Image {...props} width={800} height={400} alt={props.alt || ""} className="rounded-lg my-4" />,
  code: ({ className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "")
    const language = match ? match[1] : ""

    if (language) {
      return (
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto">
          <code className={`language-${language}`} {...props}>
            {String(children).replace(/\n$/, "")}
          </code>
        </pre>
      )
    }

    return (
      <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props}>
        {children}
      </code>
    )
  },
  h1: (props: any) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold mt-6 mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-bold mt-4 mb-2" {...props} />,
  p: (props: any) => <p className="my-4 leading-7" {...props} />,
  ul: (props: any) => <ul className="my-4 ml-6 list-disc" {...props} />,
  ol: (props: any) => <ol className="my-4 ml-6 list-decimal" {...props} />,
  li: (props: any) => <li className="mt-2" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-primary pl-4 italic my-4" {...props} />,
}

export default components
