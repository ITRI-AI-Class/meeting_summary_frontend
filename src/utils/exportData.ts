export const fetchExportData = async () => {
    try {
      const response = await fetch('/export'); // 替換為後端的匯出 API 路徑
      if (!response.ok) {
        throw new Error('匯出失敗');
      }
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  