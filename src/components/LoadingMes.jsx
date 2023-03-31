import "styles/loading.css";
import { ReactComponent as IconLoading } from "assets/icons/loading.svg";
import 'styles/app.css'
export default function LoadingMes() {
  return (
    <div className="loading_wrapper">
      <IconLoading className="loading_icon loading-animation" />
      <h3 className="loading_test">頁面載入中</h3>
    </div>
  );
}
