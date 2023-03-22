import { tweetsData } from "data/dummyAdminData";

import AdminTweetsList from "components/AdminTweetsList";

// style
import "styles/AdminTweets.css";

function AdminTweetsPage() {
  return (
    <div className="page-wrapper">
      <h4 className="page-title">推文清單</h4>
      <AdminTweetsList tweetsData={tweetsData} />
    </div>
  );
}
export default AdminTweetsPage;
