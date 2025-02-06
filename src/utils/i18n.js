import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Form Titles
      addressForm: "Address Form",

      // Buttons
      submit: "Submit",

      // Labels
      firstName: "First Name",
      lastName: "Last Name",
      phoneNumber: "Phone Number",
      pincode: "Pincode",
      street: "Street",
      city: "City",
      state: "State",
      district: "District",
      country: "Country",
      message: "Message",
      termsAndConditions: "Terms and Conditions",
      acceptTerms: "I accept the terms and conditions",
      acceptPrivacy: "I accept the privacy policy",
      PreferredLocations: "Preferred Locations",

      // Preferred Locations
      newYork: "New York",
      london: "London",
      singapore: "Singapore",
      tokyo: "Tokyo",

      // Errors & Validations
      required: "This field is required",
      firstNameValidation: "First name is required",
      lastNameValidation: "Last name is required",
      phoneValidation: "Invalid phone number format",
      pincodeValidation: "Pincode must be exactly 6 digits",
      termsRequired: "You must accept both the Terms & Conditions and the Privacy Policy.",
      preferencesRequired: "Please select at least one preference",
      messageLength: "Message must be at least 5 characters long",
    },
    
  },


  
  ta: {
    translation: {
      // Form Titles
      addressForm: "முகவரி படிவம்",

      // Buttons
      submit: "சமர்ப்பிக்கவும்",

      // Labels
      firstName: "முதல் பெயர்",
      lastName: "கடைசி பெயர்",
      phoneNumber: "தொலைபேசி எண்",
      pincode: "அஞ்சல் குறியீடு",
      street: "தெரு",
      city: "நகரம்",
      state: "மாநிலம்",
      district: "மாவட்டம்",
      country: "நாடு",
      message: "செய்தி",
      termsAndConditions: "விதிமுறைகள் மற்றும் நிபந்தனைகள்",
      acceptTerms: "நான் விதிமுறைகளை ஏற்கிறேன்",
      acceptPrivacy: "நான் தனியுரிமைக் கொள்கையை ஏற்கிறேன்",
      PreferredLocations: "விருப்பமான இடங்கள்",

      // Preferred Locations
      newYork: "நியூயார்க்",
      london: "லண்டன்",
      singapore: "சிங்கப்பூர்",
      tokyo: "டோக்கியோ",

      // Errors & Validations
      required: "இந்த புலம் தேவை",
      firstNameValidation: "முதல் பெயர் தேவை",
      lastNameValidation: "கடைசி பெயர் தேவை",
      phoneValidation: "தவறான தொலைபேசி எண் வடிவம்",
      pincodeValidation: "அஞ்சல் குறியீடு சரியாக 6 இலக்கமாக இருக்க வேண்டும்",
      termsRequired: "நான் விதிமுறைகளை ஏற்கிறேன்",
      preferencesRequired: "குறைந்தது ஒரு விருப்பத்தையாவது தேர்ந்தெடுக்கவும்",
      messageLength: "செய்தி குறைந்தது 5 எழுத்துகளாக இருக்க வேண்டும்",
    },
  },
  ja: {
    translation: {  // ✅ Added missing translation wrapper
      addressForm: "住所フォーム",
      firstName: "名",
      lastName: "姓",
      phoneNumber: "電話番号",
      pincode: "郵便番号",
      street: "住所",
      city: "市区町村",
      state: "都道府県",
      district: "地区",
      country: "国",
      message: "メッセージ",
      termsAndConditions: "利用規約",
      acceptTerms: "利用規約に同意する",
      acceptPrivacy: "プライバシーポリシーに同意する",
      PreferredLocations: "希望地域",
      submit: "送信",
      required: "この項目は必須です",
      termsRequired: "利用規約に同意する必要があります",
      preferencesRequired: "少なくとも1つ選択してください",
      pincodeValidation: "有効な6桁の郵便番号を入力してください",
      messageLength: "メッセージは5文字以上である必要があります",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: ["en-GB", "en"], // Ensure en-GB falls back to en
  interpolation: { escapeValue: false },
});


export default i18n;
