import { TypeSafeClient, choice } from '@typesafe-ai/sdk';
import * as dotenv from 'dotenv';
dotenv.config();

// 1. Sử dụng TypeSafeClient (tự động đọc TYPESAFE_API_KEY từ file .env)
const client = new TypeSafeClient();

export type TriageCategory = "LOCATOR_ISSUE" | "NETWORK_TIMEOUT" | "DATA_ISSUE" | "UNKNOWN";

export async function triageTestError(errorMessage: string, testName: string) {
    // Trimming context để tối ưu tốc độ và không gửi rác lên API
    const cleanLog = errorMessage.substring(0, 1500); 

    // 2. Gọi qua endpoint .systemOne()
    const { answers } = await client.systemOne({
        state: `Test Name: ${testName}\nError Log: ${cleanLog}`,
        questions: {
            // 3. Định nghĩa câu hỏi bằng hàm choice(), kèm theo mô tả rõ ràng để AI phân loại
            rootCause: choice(
                "Phân loại nguyên nhân gốc rễ của lỗi này dựa trên Playwright log.", 
                {
                    "LOCATOR_ISSUE": "Không tìm thấy element, locator bị thay đổi hoặc sai cú pháp",
                    "NETWORK_TIMEOUT": "Lỗi timeout, mạng chậm, server phản hồi lâu",
                    "DATA_ISSUE": "Lỗi liên quan đến dữ liệu test không khớp",
                    "UNKNOWN": "Không thể xác định rõ nguyên nhân từ log"
                }
            )
        }
    });

// 4. Bóc tách object trả về từ Jev
    const decision = answers.rootCause;
    return {
        result: decision.choice as TriageCategory, 
        // Lấy xác suất của chính xác lựa chọn (choice) vừa được Jev chốt
        probability: decision.probabilities[decision.choice], 
        // Nếu muốn, bạn có thể trả về toàn bộ phân phối để log ra HTML Report
        allProbabilities: decision.probabilities, 
        confidence: decision.confidence            
    };
}