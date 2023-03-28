// style
import "styles/tweetNavbar.css";

function NavItem({ className, navbarData, onViewChange }) {
  return (
    <>
      <li
        className={className}
        onClick={() => {
          onViewChange(navbarData.view);
        }}
      >
        {navbarData.title}
      </li>
    </>
  );
}

function TweetNavbar({ navbarData, currentView, onViewChange }) {
  const nav_item = navbarData.map((item, index) => {
    if (currentView === item.view) {
      return (
        <NavItem
          className="tweet-navbar-item active"
          key={index}
          navbarData={item}
          onViewChange={onViewChange}
        />
      );
    } else {
      return (
        <NavItem
          className="tweet-navbar-item"
          key={index}
          navbarData={item}
          onViewChange={onViewChange}
        />
      );
    }
  });

  return <ul className="tweet-navbar">{nav_item}</ul>;
}

export default TweetNavbar;
