// style
import "styles/tweetNavbar.css";

function NavItem(data) {
  let navData = data.data;
  return navData.map((item, index) => (
    <li className="tweet-navbar-item" key={`nav-${index}`}>
      {item}
    </li>
  ));
}

function TweetNavbar(data) {
  let navData = data.navbarData;
  return (
    <ul className="tweet-navbar">
      <NavItem data={navData} />
    </ul>
  );
}

export default TweetNavbar;
