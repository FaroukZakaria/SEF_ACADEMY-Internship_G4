import LeftPanel from "../../components/admin/login/LeftPanel";
import LoginForm from "../../components/admin/login/LoginForm";

const AdminLogin = () => {
  return (
    <div className="min-h-screen bg-amazon-bg flex items-center justify-center p-6">
      <div className="w-full max-w-7xl rounded-3xl border border-amazon-border overflow-hidden shadow-xl grid lg:grid-cols-2">
        <LeftPanel />
        <LoginForm />
      </div>
    </div>
  );
};
export default AdminLogin;
