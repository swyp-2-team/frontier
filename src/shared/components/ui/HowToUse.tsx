import { Button } from "@/shared/components/ui/button";

export default function HowToUse() {
  return (
    <article className="w-[280px] 2xl:w-[340px] flex px-[30px] items-center bg-white rounded-[16px] text-center">
      <section>
        <h3 className="text-3xl font-semibold 2xl:headline-40_SB mb-5 2xl:mb-9 text-gray-800">
          How to use
        </h3>
        <p className="body-16 2xl:title-20 text-gray-800 mb-5 2xl:mb-9">
          노티코어를 제대로 활용하는 방법, 지금 가이드에서 확인하세요
        </p>
        <Button
          onClick={() =>
            window.open(
              "https://leather-skate-422.notion.site/Noticore-Draft-1eb61ff41cbd8057a1d6fbc2ae732b19",
              "_blank",
              "noopener,noreferrer"
            )
          }
          variant={"black"}
          className="body-16_SB 2xl:body-18_SB"
        >
          가이드 확인하기
        </Button>
      </section>
    </article>
  );
}
