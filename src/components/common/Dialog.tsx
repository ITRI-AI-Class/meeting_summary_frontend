import React from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

interface DialogProps {
    message: string;
    onClose: () => void;
    onConfirm: () => void;
}

export function Dialog({ message, onClose, onConfirm }: DialogProps) {
    const { t } = useTranslation(); // 使用 i18n 的翻譯功能
    
    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <p className="text-gray-800 text-lg mb-4">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                    >
                        {t("cancel")}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        {t("confirm")}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
