import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <div className="@container p-2 flex flex-wrap gap-2 justify-start">
          <Link to="/" className="clamp-[text,lg,3xl,@sm,@5xl]">
            Home
          </Link>
          <Link to="/inventory/items" className="clamp-[text,lg,3xl,@sm,@5xl]">
            items
          </Link>
    </div>
  );
}
