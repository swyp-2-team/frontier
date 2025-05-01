import { Button } from "@/shared/components/ui/button";

export default function HowToUse() {
  return (
    <article className="w-[340px] flex px-[30px] items-center bg-white rounded-[16px] text-center">
      <section>
        <h3 className="headline-40_SB mb-10 text-gray-800">How to use</h3>
        <p className="title-20 text-gray-800 mb-10">
          노티코어를 제대로 활용하는 방법, 지금 가이드에서 확인하세요
        </p>
        <Button
          variant={"black"}
          className="w-39 h-12 rounded-[12px] body-18_SB"
        >
          다운로드
        </Button>
      </section>
    </article>
  );
}
