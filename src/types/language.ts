
export type Language = 'ko' | 'en' | 'ja';

export interface Translations {
  [key: string]: {
    ko: string;
    en: string;
    ja: string;
  };
}

export const translations: Translations = {
  // Header
  title: {
    ko: "나의 음식 여행",
    en: "My Food Journey",
    ja: "私の食事の旅"
  },
  subtitle: {
    ko: "오늘의 맛있는 요리 모험 모음",
    en: "A delicious collection of today's culinary adventures",
    ja: "今日の美味しい料理の冒険コレクション"
  },
  addFoodEntry: {
    ko: "음식 추가하기",
    en: "Add Food Entry",
    ja: "料理を追加"
  },
  adminMode: {
    ko: "관리 모드",
    en: "Admin Mode",
    ja: "管理モード"
  },
  exitAdminMode: {
    ko: "관리 모드 종료",
    en: "Exit Admin Mode",
    ja: "管理モード終了"
  },
  adminModeActive: {
    ko: "🔧 관리 모드가 활성화되었습니다. 카드를 클릭하여 수정/삭제할 수 있습니다.",
    en: "🔧 Admin mode is active. Click cards to edit/delete them.",
    ja: "🔧 管理モードがアクティブです。カードをクリックして編集/削除できます。"
  },
  
  // Stats
  totalEntries: {
    ko: "총 음식",
    en: "Total Foods",
    ja: "総料理数"
  },
  averageRating: {
    ko: "평균 평점",
    en: "Average Rating",
    ja: "平均評価"
  },
  homemadeCount: {
    ko: "홈메이드",
    en: "Homemade",
    ja: "手作り"
  },
  purchasedCount: {
    ko: "구매",
    en: "Purchased",
    ja: "購入"
  },
  
  // Food types and badges
  homemade: {
    ko: "홈메이드",
    en: "Homemade",
    ja: "手作り"
  },
  purchased: {
    ko: "구매",
    en: "Purchased",
    ja: "購入"
  },
  
  // Card details
  type: {
    ko: "종류:",
    en: "Type:",
    ja: "種類:"
  },
  rating: {
    ko: "평점:",
    en: "Rating:",
    ja: "評価:"
  },
  date: {
    ko: "날짜:",
    en: "Date:",
    ja: "日付:"
  },
  review: {
    ko: "리뷰:",
    en: "Review:",
    ja: "レビュー:"
  },
  tags: {
    ko: "태그:",
    en: "Tags:",
    ja: "タグ:"
  },
  
  // Empty state
  noEntriesTitle: {
    ko: "음식 기록이 없습니다",
    en: "No food entries found",
    ja: "料理の記録がありません"
  },
  noEntriesDescription: {
    ko: "필터를 조정하거나 새로운 음식을 추가해보세요!",
    en: "Try adjusting your filters or add a new food entry!",
    ja: "フィルターを調整するか、新しい料理を追加してみてください！"
  },
  
  // Password dialog
  adminAuth: {
    ko: "관리자 인증",
    en: "Admin Authentication",
    ja: "管理者認証"
  },
  enterPassword: {
    ko: "비밀번호를 입력하세요",
    en: "Enter password",
    ja: "パスワードを入力してください"
  },
  password: {
    ko: "비밀번호",
    en: "Password",
    ja: "パスワード"
  },
  cancel: {
    ko: "취소",
    en: "Cancel",
    ja: "キャンセル"
  },
  authenticate: {
    ko: "인증",
    en: "Authenticate",
    ja: "認証"
  },
  authSuccess: {
    ko: "인증 성공",
    en: "Authentication Success",
    ja: "認証成功"
  },
  authSuccessDesc: {
    ko: "관리 모드가 활성화되었습니다.",
    en: "Admin mode has been activated.",
    ja: "管理モードが有効になりました。"
  },
  authFailed: {
    ko: "인증 실패",
    en: "Authentication Failed",
    ja: "認証失敗"
  },
  authFailedDesc: {
    ko: "비밀번호가 올바르지 않습니다.",
    en: "Password is incorrect.",
    ja: "パスワードが正しくありません。"
  },
  
  // Delete confirmation
  confirmDelete: {
    ko: "정말 삭제하시겠습니까?",
    en: "Are you sure you want to delete?",
    ja: "本当に削除しますか？"
  },
  deleteWarning: {
    ko: "을(를) 삭제하면 복구할 수 없습니다.",
    en: " will be permanently deleted and cannot be recovered.",
    ja: "を削除すると元に戻すことができません。"
  },
  delete: {
    ko: "삭제",
    en: "Delete",
    ja: "削除"
  },
  deleteComplete: {
    ko: "삭제 완료",
    en: "Delete Complete",
    ja: "削除完了"
  },
  deleteCompleteDesc: {
    ko: "음식 정보가 성공적으로 삭제되었습니다.",
    en: "Food entry has been successfully deleted.",
    ja: "料理情報が正常に削除されました。"
  },
  
  // Language selector
  language: {
    ko: "언어",
    en: "Language",
    ja: "言語"
  },
  korean: {
    ko: "한국어",
    en: "Korean",
    ja: "韓国語"
  },
  english: {
    ko: "영어",
    en: "English",
    ja: "英語"
  },
  japanese: {
    ko: "일본어",
    en: "Japanese",
    ja: "日本語"
  }
};
