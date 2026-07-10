import { Link } from "react-router-dom";

function Button({ href, to, variant = "primary", children, ...rest }) {
  const className = `button button-${variant}`;

  if (to) {
    return (
      <Link className={className} to={to} {...rest}>
        {children}
      </Link>
    );
  }

  const isExternal = /^https?:\/\//.test(href || "");

  return (
    <a
      className={className}
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

export default Button;
