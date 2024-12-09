type Props = {
  title: string;
};

const Title = ({ title }: Props) => {
  return (
    <h1 className="my-4 text-center text-4xl font-medium tracking-tight text-primary sm:text-5xl md:text-6xl">
      {title}
    </h1>
  );
};

export default Title;
