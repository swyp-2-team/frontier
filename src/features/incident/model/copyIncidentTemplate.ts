import { toast } from "sonner";

// 복사하기 버튼 눌렀을 때 실행할 함수
export const onRecipientClick = async (
  setIsRecipientClicked: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    navigator.clipboard.writeText("noticore@noticore.co.kr");
    toast.success("복사 되었습니다! 이메일에 붙여넣기하세요.");
    setIsRecipientClicked(true);
  } catch (e) {
    toast.error(`복사 실패. 실패 사유 : ${e}`);
  }
};

export const onSubjectClick = async (
  selectedGroups: string[],
  setIsSubjectClicked: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (selectedGroups.length === 0) {
    toast.error("장애를 수신할 그룹을 먼저 선택하세요.");
  } else {
    try {
      navigator.clipboard.writeText(
        `[emergency: ${selectedGroups.join(
          ", "
        )}] ‘이 곳에 장애 제목을 입력하세요’`
      );
      toast.success("복사 되었습니다! 이메일에 붙여넣기하세요.");
      setIsSubjectClicked(true);
    } catch (e) {
      toast.error(`복사 실패. 실패 사유 : ${e}`);
    }
  }
};

export const onBodyClick = (
  setIsBodyClicked: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    navigator.clipboard.writeText(
      `1. 장애 발생 시간 : \n2. 장애 확인 경로 : \n3. 장애 증상 : \n4. 영향 범위 : `
    );
    toast.success("복사 되었습니다! 이메일에 붙여넣기하세요.");
    setIsBodyClicked(true);
  } catch (e) {
    toast.error(`복사 실패. 실패 사유 : ${e}`);
  }
};
