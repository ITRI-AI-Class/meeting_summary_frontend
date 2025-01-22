import React from "react";
import { useNavigate } from "react-router-dom";
import { Video } from "lucide-react";
import { useTranslation } from "react-i18next"; // 引入 useTranslation

export function Footer() {
  const navigate = useNavigate();
  const { t } = useTranslation(); // 使用翻譯功能

  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 左側區域 */}
          <div>
            <div className="flex items-center space-x-2 text-white mb-4">
              <Video className="w-6 h-6" />
              <span className="text-xl font-semibold">{t("footer.title")}</span>
            </div>
            <p className="text-sm">{t("footer.description")}</p>
          </div>

          {/* 中間區域 */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigate("/login")} className="hover:text-white transition-colors">
                  {t("footer.login")}
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/login")} className="hover:text-white transition-colors">
                  {t("footer.signUp")}
                </button>
              </li>
            </ul>
          </div>

          {/* 右側區域 */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("footer.legal")}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t("footer.privacyPolicy")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t("footer.termsOfService")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 底部區域 */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} {t("footer.title")}. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
