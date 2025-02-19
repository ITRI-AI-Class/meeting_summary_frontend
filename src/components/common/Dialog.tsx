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
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 dark:bg-gray-800">
                <p className="text-gray-800 dark:text-white text-lg mb-4">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-red-50 border border-red-600"
                    >
                        {t("cancel")}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 hover:bg-gray-50 text-gray-700 rounded-md border border-gray-300 
        shadow-sm dark:hover:bg-indigo-400
        dark:bg-indigo-200 dark:border-transparent dark:text-indigo-700 transition-colors"
                    >
                        {t("confirm")}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
