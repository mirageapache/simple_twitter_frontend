import { usersData } from "data/dummyAdminData";

import AdminUsersList from "components/admin/AdminUsersList";

// style
import "styles/AdminUsers.css";

function AdminTweetsPage() {
  return (
    <>
      <h4 className="page-title">使用者列表</h4>
      <AdminUsersList usersData={usersData} />
    </>
  );
}
export default AdminTweetsPage;
