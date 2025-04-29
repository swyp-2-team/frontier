import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="flex flex-1 bg-[url('@/assets/images/banner.png')] bg-cover bg-center rounded-[16px] h-[370px] text-white">
      <div className="flex flex-col w-full bg-gradient-to-b justify-center items-center from-black/28 to-transparent rounded-[16px]">
        <h2 className="headline-40 mb-6">
          장애를 손쉽게 등록하고, 실시간으로 전파하세요
        </h2>
        <p className="title-20_SB mb-[30px]">
          이메일부터 메신저까지, 각종 알림으로 장애 발생을 빠르게 알려요.
        </p>
        <Button
          asChild
          variant={"basic"}
          className="bg-white text-black body-18_SB w-[156px] h-[48px] rounded-[12px] hover:bg-primary hover:text-white py-[10px] px-[46px]"
        >
          <Link to={"/incident-register"}>장애등록</Link>
        </Button>
      </div>
    </div>
  );
}
