import { usersData } from "data/dummyAdminData";

import AdminUsersList from "components/Admin/AdminUsersList";

// style
import "styles/AdminUsers.css";

function AdminTweetsPage() {
  return (
    <div className="admin-tweets">
      <h4 className="admin-page-title">使用者列表</h4>
      <AdminUsersList usersData={usersData} />
    </div>
  );
}
export default AdminTweetsPage;
