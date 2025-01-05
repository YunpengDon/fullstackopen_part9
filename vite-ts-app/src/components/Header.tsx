interface CourseName {
  name: string;
}

const Header = (prop: CourseName) => {
  return <h1>{prop.name}</h1>;
};

export default Header;
