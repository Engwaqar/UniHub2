// live hosts

export default urls = {
  HOST: "https://admin.myuhub.com/api/",
  BASE_URL: "https://admin.myuhub.com/api/",
  IMG_BASE_URL: "https://admin.myuhub.com/api/",

  //Login
  LOGIN: "login",
  NEW_LOGIN: "new-login",

  SOCIAL_LOGIN: "social_login",
  REGISTER: "register",
  NEW_REGISTER: "new-register",
  GET_ALL_UNIES: "get_all_universities",
  FORGOT_PASSWORD: "forget_password",
  CHANGE_PASSWORD: "change_password",
  UPDATE_PASSWORD: "update_password",
  MATCH_OTP: "match_otp",
  NEW_MATCH_OTP: "new-match_otp",

  //Profile

  GET_PROFILE: "my_profile",
  MY_PROFILE: "my_profile",
  UPDATE_PROFILE: "update_profile?_method=PUT",
  NEW_UPDATE_PROFILE: "new_update_profile?_method=PUT",
  SWITCH_PROFILE: "switch_profile",
  //
  GET_SELLER_PRODUCTS: "products",
  ADD_PRODUCTS: "products",
  ADD_EVENT: "events",
  PRODUCTS: "products",
  ACTIVE_DEACTIVATE_PRODUCT: "product_active_deactive",
  PRODUCT_CATEGORIES: "product_category",
  SERVICE_CATEGORIES: "service_category",
  UNIVERSITIES: "universities",
  EVENTS: "events",
  ACTIVE_DEACTIVATE_EVENT: "event_active_deactive",
  HUB_SERVICES: "cleaning_services",
  ACTIVE_DEACTIVATE_SERVICE_HUB: "cleaning_service_active_deactive",
  MY_ORDER: "all_orders", //replace by book_product
  BOOK_PRODUCT: "book_product",
  //Ticket
  GENERATING_SELLING_QR: "book_event/generate_selling_qr",
  TRANSFER_EVENT_TICKET: "book_event/transfer_event_booking",
  MY_TICKETS: "book_event",
  BOOK_TICKET: "book_event",
  ADD_CARD: "create_payment_method",
  MAKE_PAYMENT_PRIMARY: "make_payment_method_primary",
  CONFIRM_PAYEMENT: "confirm_payment",
  BANK_DETAIL: "bank_details",
  GET_CARDS: "get_cards",
  GET_ALL_PRODUCTS: "all_products",
  GET_EVENT_LIST: "all_events",
  TICKET_NOTIFICATION: "book_event/ticket_transfer_notifications",
  NOTIFICATION_BY_ID: "book_event/ticket_transfer_notification/",
  //SERVICE
  ALL_SERVICE_PROVIDERS: "all_service_providers",
  ALL_SERVICES: "all_services",
  BOOK_SERVICE: "book_services",
  BOOKED_SERVICE: "book_services",
  ORDER_REVIEW: "order_review",
  TIME_SLOTS: "bookings",
  CANCEL_SERVICE: "book_services/cancel", //Appoinment cancel
  //CART
  ADD_TO_CART: "wishlist",
  CART_LIST: "wishlist",
  CHECKOUT: "checkout",
  UPLOAD_IMAGE: "upload_message_image",
  //Store
  GET_ALL_STORES: "get_all_stores",
  GET_STORE_PRODUCTS: "get_store_products/",
  WITHDRAW: "release-funds",

  //Guest
  guest_all_products: "guest_all_products",
  guest_book_product: "guest_book_product",

  guest_book_event: "guest_book_event",
  guest_book_service: "guest_book_service",
  guest_all_service_providers: "guest_all_service_providers",
  guest_all_services_of_provider: "guest_all_services_of_provider/",
  guest_all_events: "guest_all_events",

  inquiry: "inquiry",

  //Promotion

  PROMOTION: "promotion",
  GET_PROMOTION_PKGS: "get_promotion_packages",
  VERIFY_QR: "verify_qr?qr=",
};
