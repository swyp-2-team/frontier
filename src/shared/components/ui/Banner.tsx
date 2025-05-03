import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="flex flex-1 bg-[url('/images/banner.png')] bg-cover bg-center rounded-[16px] h-[250px] 2xl:h-[370px] text-white">
      <div className="flex flex-col w-full bg-gradient-to-b justify-center items-center from-black/40 to-transparent rounded-[16px]">
        <h2 className="text-3xl 2xl:headline-40 mb-[6px]">
          장애를 손쉽게 등록하고, 실시간으로 전파하세요
        </h2>
        <p className="body-16 2xl:title-20 mb-[30px]">
          이메일부터 메신저까지, 각종 알림으로 장애 발생을 빠르게 알려요.
        </p>
        <Button
          asChild
          variant={"basic"}
          className="bg-white text-black body-16_SB 2xl:body-18_SB w-30 2xl:w-39 h-9 2xl:h-12 rounded-[8px] 2xl:rounded-[12px] hover:bg-primary hover:text-white active:bg-white active:text-primary"
        >
          <Link to={"/incident-register"}>장애등록</Link>
        </Button>
      </div>
    </div>
  );
}
