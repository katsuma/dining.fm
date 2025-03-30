import { type ComponentProps, forwardRef } from 'react';
import { Link } from 'react-router';

const Anchor = forwardRef<HTMLAnchorElement, ComponentProps<'a'>>(
  function ReactRouterLink({ href = '', ...props }, forwardedRef) {
    return <Link {...props} to={href} ref={forwardedRef} />;
  },
);
Anchor.displayName = 'Anchor';

function Heading2(props: React.ComponentProps<"h1">) {
  return <h2 {...props} className="title" />
}

function Heading3(props: React.ComponentProps<"h1">) {
  return <h3 {...props} className="mb-2 text-[1.4rem] font-semibold" />
}

function P(props: React.ComponentProps<"p">) {
  return <p {...props} className="text-xl leading-[2.2rem] mb-6" />
}

function UnorderedList(props: React.ComponentProps<"ul">) {
  return <ul {...props} className="ml-6" />
}

function List(props: React.ComponentProps<"li">) {
  return <li {...props} className="text-xl" />
}

function Image(props: React.ComponentProps<"img">) {
  return <img {...props} className="w-full rounded-[0.8rem]" />
}

export const components = {
  a: Anchor,
  h2: Heading2,
  h3: Heading3,
  p: P,
  ul: UnorderedList,
  li: List,
  img: Image,
}
