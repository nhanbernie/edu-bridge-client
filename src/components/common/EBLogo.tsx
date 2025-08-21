import Image from "next/image";

const Logo = () => (
  <div className="flex items-center gap-2">
    <Image src="/logo.svg" alt="EduBridge" width={100} height={100} />
    <h1 className="text-white font-bold text-sm">EduBridge</h1>
  </div>
);

export default Logo;
