import { Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MouseEvent } from "react";

const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || "jedutools|gmail.com")
  .split("|")
  .join("@");
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  ADMIN_EMAIL
)}`;

const openGmailCompose = (event: MouseEvent<HTMLAnchorElement>) => {
  const width = Math.min(700, window.screen.availWidth);
  const height = Math.min(650, window.screen.availHeight);
  const left = Math.round(window.screenX + (window.outerWidth - width) / 2);
  const top = Math.round(window.screenY + (window.outerHeight - height) / 2);
  const popup = window.open(
    GMAIL_COMPOSE_URL,
    "gmail-compose",
    `popup=yes,width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
  );

  if (popup) {
    event.preventDefault();
    popup.opener = null;
    popup.focus();
  }
};

export default function Contact() {
  return (
    <div id="contact" className="my-10 py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center mb-3">
            <MessageSquare className="h-5 w-5 text-blue-800 mr-2" />
            <h2 className="font-medium text-gray-800">
              문의 및 안내
            </h2>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            궁금한 점이 있거나 더 많은 정보를 원하시면 아래 방법으로 연락하세요.
          </p>

          <Button asChild>
            <a
              href={GMAIL_COMPOSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={openGmailCompose}
              className="inline-flex items-center"
            >
              <Mail className="w-5 h-5 mr-2 -ml-1" />
              문의 메일 보내기
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
