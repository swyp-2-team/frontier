import { Button } from "@/shared/components/ui/button";

export default function HowToUse() {
  return (
    <div className="w-77 bg-white rounded-[16px] pt-17 px-8 pb-13 text-center">
      <h3 className="headline-40_SB mb-10">How to use</h3>
      <p className="body-16 mb-10">
        노티코어를 제대로 활용하는 방법, 지금 가이드에서 확인하세요
      </p>
      <Button variant={"black"} className="w-39 h-12 rounded-[12px]">
        다운로드
      </Button>
    </div>
  );
}
