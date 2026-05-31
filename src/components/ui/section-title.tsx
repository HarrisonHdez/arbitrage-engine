type Props = {
  children: string;
};

export function SectionTitle({ children }: Props) {
  return <h2 className="mb-4 text-sm font-semibold">{children}</h2>;
}
