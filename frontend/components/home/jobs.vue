<template>
  <div class="">
    <div class="flex justify-between items-center mt-6 mb-3">
      <span class="text-xl font-semibold text-primary">Việc làm HOT nhất!</span>
      <NuxtLink class="text-primary text-base hover:underline cursor-pointer"
        >Xem thêm</NuxtLink
      >
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Job Card 1 -->
      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4"
        >
          <div class="flex items-center mb-3 sm:mb-0">
            <img
              src="~/assets/images/home/nafotech-logo.png"
              class="w-[90px] h-[90px] object-contain mr-4"
            />

            <div>
              <h2
                class="text-sm sm:text-base font-medium text-gray-900 leading-tight"
              >
                [Tuyển Freelancer] Phát triển Website Thuế Sách Trực Tuyến
                (Custom Code)
              </h2>
              <div class="flex items-center justify-between">
                <div class="flex items-center mt-1 text-xs text-gray-500">
                  <User class="w-4 h-4 mr-1" />
                  Đặng Quốc Huy
                </div>
                <div class="flex items-center text-xs text-gray-500">
                  <svg
                    class="w-3.5 h-3.5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  TP. Đà Nẵng
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4"
        >
          <div
            class="text-primary font-medium text-lg sm:text-base mb-2 sm:mb-0"
          >
            30.000.000 đ - 50.000.000 đ
          </div>
          <div class="text-gray-500 text-sm">
            Hạn nhận hồ sơ: 16 giờ 30 phút
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mt-4 mb-4">
          <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
            >Lập trình web</span
          >
          <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
            >ReactJS, NextJs</span
          >
          <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
            >SQL, NodeJs</span
          >
        </div>

        <div class="flex justify-between items-center mt-4">
          <button
            class="bg-primary-gradient hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full text-sm transition duration-150 ease-in-out"
          >
            Apply now!
          </button>
          <button
            class="bg-red-500 hover:text-red-600 p-2 rounded-full text-white hover:bg-red-50 transition duration-150 ease-in-out" @click="save"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4"
        >
          <div class="flex items-center mb-3 sm:mb-0">
            <img
              src="~/assets/images/home/nafotech-logo.png"
              class="w-[90px] h-[90px] object-contain mr-4"
            />

            <div>
              <h2
                class="text-sm sm:text-base font-medium text-gray-900 leading-tight"
              >
                [Tuyển Freelancer] Phát triển Website Thuế Sách Trực Tuyến
                (Custom Code)
              </h2>
              <div class="flex items-center justify-between">
                <div class="flex items-center mt-1 text-xs text-gray-500">
                  <User class="w-4 h-4 mr-1" />
                  Đặng Quốc Huy
                </div>
                <div class="flex items-center text-xs text-gray-500">
                  <svg
                    class="w-3.5 h-3.5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  TP. Đà Nẵng
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4"
        >
          <div
            class="text-primary font-medium text-lg sm:text-base mb-2 sm:mb-0"
          >
            30.000.000 đ - 50.000.000 đ
          </div>
          <div class="text-gray-500 text-sm">
            Hạn nhận hồ sơ: 16 giờ 30 phút
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mt-4 mb-4">
          <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
            >Lập trình web</span
          >
          <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
            >ReactJS, NextJs</span
          >
          <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
            >SQL, NodeJs</span
          >
        </div>

        <div class="flex justify-between items-center mt-4">
          <button
            class="bg-primary-gradient hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full text-sm transition duration-150 ease-in-out"
          >
            Apply now!
          </button>
          <button
            class="bg-red-500 hover:text-red-600 p-2 rounded-full text-white hover:bg-red-50 transition duration-150 ease-in-out" @click="save"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4"
        >
          <div class="flex items-center mb-3 sm:mb-0">
            <img
              src="~/assets/images/home/nafotech-logo.png"
              class="w-[90px] h-[90px] object-contain mr-4"
            />

            <div>
              <h2
                class="text-sm sm:text-base font-medium text-gray-900 leading-tight"
              >
                [Tuyển Freelancer] Phát triển Website Thuế Sách Trực Tuyến
                (Custom Code)
              </h2>
              <div class="flex items-center justify-between">
                <div class="flex items-center mt-1 text-xs text-gray-500">
                  <User class="w-4 h-4 mr-1" />
                  Đặng Quốc Huy
                </div>
                <div class="flex items-center text-xs text-gray-500">
                  <svg
                    class="w-3.5 h-3.5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  TP. Đà Nẵng
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4"
        >
          <div
            class="text-primary font-medium text-lg sm:text-base mb-2 sm:mb-0"
          >
            30.000.000 đ - 50.000.000 đ
          </div>
          <div class="text-gray-500 text-sm">
            Hạn nhận hồ sơ: 16 giờ 30 phút
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mt-4 mb-4">
          <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
            >Lập trình web</span
          >
          <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
            >ReactJS, NextJs</span
          >
          <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
            >SQL, NodeJs</span
          >
        </div>

        <div class="flex justify-between items-center mt-4">
          <button
            class="bg-primary-gradient hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full text-sm transition duration-150 ease-in-out"
          >
            Apply now!
          </button>
          <button
            class="bg-red-500 hover:text-red-600 p-2 rounded-full text-white hover:bg-red-50 transition duration-150 ease-in-out" @click="save"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4"
        >
          <div class="flex items-center mb-3 sm:mb-0">
            <img
              src="~/assets/images/home/nafotech-logo.png"
              class="w-[90px] h-[90px] object-contain mr-4"
            />

            <div>
              <h2
                class="text-sm sm:text-base font-medium text-gray-900 leading-tight"
              >
                [Tuyển Freelancer] Phát triển Website Thuế Sách Trực Tuyến
                (Custom Code)
              </h2>
              <div class="flex items-center justify-between">
                <div class="flex items-center mt-1 text-xs text-gray-500">
                  <User class="w-4 h-4 mr-1" />
                  Đặng Quốc Huy
                </div>
                <div class="flex items-center text-xs text-gray-500">
                  <svg
                    class="w-3.5 h-3.5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  TP. Đà Nẵng
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4"
        >
          <div
            class="text-primary font-medium text-lg sm:text-base mb-2 sm:mb-0"
          >
            30.000.000 đ - 50.000.000 đ
          </div>
          <div class="text-gray-500 text-sm">
            Hạn nhận hồ sơ: 16 giờ 30 phút
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mt-4 mb-4">
          <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
            >Lập trình web</span
          >
          <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
            >ReactJS, NextJs</span
          >
          <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
            >SQL, NodeJs</span
          >
        </div>

        <div class="flex justify-between items-center mt-4">
          <button
            class="bg-primary-gradient hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full text-sm transition duration-150 ease-in-out"
          >
            Apply now!
          </button>
          <button
            class="bg-red-500 hover:text-red-600 p-2 rounded-full text-white hover:bg-red-50 transition duration-150 ease-in-out" @click="save"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4"
        >
          <div class="flex items-center mb-3 sm:mb-0">
            <img
              src="~/assets/images/home/nafotech-logo.png"
              class="w-[90px] h-[90px] object-contain mr-4"
            />

            <div>
              <h2
                class="text-sm sm:text-base font-medium text-gray-900 leading-tight"
              >
                [Tuyển Freelancer] Phát triển Website Thuế Sách Trực Tuyến
                (Custom Code)
              </h2>
              <div class="flex items-center justify-between">
                <div class="flex items-center mt-1 text-xs text-gray-500">
                  <User class="w-4 h-4 mr-1" />
                  Đặng Quốc Huy
                </div>
                <div class="flex items-center text-xs text-gray-500">
                  <svg
                    class="w-3.5 h-3.5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  TP. Đà Nẵng
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4"
        >
          <div
            class="text-primary font-medium text-lg sm:text-base mb-2 sm:mb-0"
          >
            30.000.000 đ - 50.000.000 đ
          </div>
          <div class="text-gray-500 text-sm">
            Hạn nhận hồ sơ: 16 giờ 30 phút
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mt-4 mb-4">
          <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
            >Lập trình web</span
          >
          <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
            >ReactJS, NextJs</span
          >
          <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
            >SQL, NodeJs</span
          >
        </div>

        <div class="flex justify-between items-center mt-4">
          <button
            class="bg-primary-gradient hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full text-sm transition duration-150 ease-in-out"
          >
            Apply now!
          </button>
          <button
            class="bg-red-500 hover:text-red-600 p-2 rounded-full text-white hover:bg-red-50 transition duration-150 ease-in-out" @click="save"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4"
        >
          <div class="flex items-center mb-3 sm:mb-0">
            <img
              src="~/assets/images/home/nafotech-logo.png"
              class="w-[90px] h-[90px] object-contain mr-4"
            />

            <div>
              <h2
                class="text-sm sm:text-base font-medium text-gray-900 leading-tight"
              >
                [Tuyển Freelancer] Phát triển Website Thuế Sách Trực Tuyến
                (Custom Code)
              </h2>
              <div class="flex items-center justify-between">
                <div class="flex items-center mt-1 text-xs text-gray-500">
                  <User class="w-4 h-4 mr-1" />
                  Đặng Quốc Huy
                </div>
                <div class="flex items-center text-xs text-gray-500">
                  <svg
                    class="w-3.5 h-3.5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  TP. Đà Nẵng
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4"
        >
          <div
            class="text-primary font-medium text-lg sm:text-base mb-2 sm:mb-0"
          >
            30.000.000 đ - 50.000.000 đ
          </div>
          <div class="text-gray-500 text-sm">
            Hạn nhận hồ sơ: 16 giờ 30 phút
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mt-4 mb-4">
          <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
            >Lập trình web</span
          >
          <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
            >ReactJS, NextJs</span
          >
          <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
            >SQL, NodeJs</span
          >
        </div>

        <div class="flex justify-between items-center mt-4">
          <button
            class="bg-primary-gradient hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full text-sm transition duration-150 ease-in-out"
          >
            Apply now!
          </button>
          <button
            class="bg-red-500 hover:text-red-600 p-2 rounded-full text-white hover:bg-red-50 transition duration-150 ease-in-out" @click="save"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4"
        >
          <div class="flex items-center mb-3 sm:mb-0">
            <img
              src="~/assets/images/home/nafotech-logo.png"
              class="w-[90px] h-[90px] object-contain mr-4"
            />

            <div>
              <h2
                class="text-sm sm:text-base font-medium text-gray-900 leading-tight"
              >
                [Tuyển Freelancer] Phát triển Website Thuế Sách Trực Tuyến
                (Custom Code)
              </h2>
              <div class="flex items-center justify-between">
                <div class="flex items-center mt-1 text-xs text-gray-500">
                  <User class="w-4 h-4 mr-1" />
                  Đặng Quốc Huy
                </div>
                <div class="flex items-center text-xs text-gray-500">
                  <svg
                    class="w-3.5 h-3.5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  TP. Đà Nẵng
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4"
        >
          <div
            class="text-primary font-medium text-lg sm:text-base mb-2 sm:mb-0"
          >
            30.000.000 đ - 50.000.000 đ
          </div>
          <div class="text-gray-500 text-sm">
            Hạn nhận hồ sơ: 16 giờ 30 phút
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mt-4 mb-4">
          <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
            >Lập trình web</span
          >
          <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
            >ReactJS, NextJs</span
          >
          <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
            >SQL, NodeJs</span
          >
        </div>

        <div class="flex justify-between items-center mt-4">
          <button
            class="bg-primary-gradient hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full text-sm transition duration-150 ease-in-out"
          >
            Apply now!
          </button>
          <button
            class="bg-red-500 hover:text-red-600 p-2 rounded-full text-white hover:bg-red-50 transition duration-150 ease-in-out" @click="save"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4"
        >
          <div class="flex items-center mb-3 sm:mb-0">
            <img
              src="~/assets/images/home/nafotech-logo.png"
              class="w-[90px] h-[90px] object-contain mr-4"
            />

            <div>
              <h2
                class="text-sm sm:text-base font-medium text-gray-900 leading-tight"
              >
                [Tuyển Freelancer] Phát triển Website Thuế Sách Trực Tuyến
                (Custom Code)
              </h2>
              <div class="flex items-center justify-between">
                <div class="flex items-center mt-1 text-xs text-gray-500">
                  <User class="w-4 h-4 mr-1" />
                  Đặng Quốc Huy
                </div>
                <div class="flex items-center text-xs text-gray-500">
                  <svg
                    class="w-3.5 h-3.5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  TP. Đà Nẵng
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4"
        >
          <div
            class="text-primary font-medium text-lg sm:text-base mb-2 sm:mb-0"
          >
            30.000.000 đ - 50.000.000 đ
          </div>
          <div class="text-gray-500 text-sm">
            Hạn nhận hồ sơ: 16 giờ 30 phút
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mt-4 mb-4">
          <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
            >Lập trình web</span
          >
          <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
            >ReactJS, NextJs</span
          >
          <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
            >SQL, NodeJs</span
          >
        </div>

        <div class="flex justify-between items-center mt-4">
          <button
            class="bg-primary-gradient hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full text-sm transition duration-150 ease-in-out"
          >
            Apply now!
          </button>
          <button
            class="bg-red-500 hover:text-red-600 p-2 rounded-full text-white hover:bg-red-50 transition duration-150 ease-in-out" @click="save"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { User } from "lucide-vue-next";
  const save = () => {
    ElNotification({
      title: 'Thành công',
      message: 'Lưu việc làm thành công',
      type: 'success',
    })
  }
</script>
