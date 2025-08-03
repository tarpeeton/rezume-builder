export interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
  isLoading?: boolean;
  message?: string;
  messageType?: "success" | "error" | "info";
}
