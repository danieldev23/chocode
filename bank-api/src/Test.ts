/*
 * MIT License
 *
 * Copyright (c) 2024 CookieGMVN and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { MB } from "./index";

(async () => {
  const mb = new MB({
    username: "HUYPC2005",
    password: "Huydev2005@",
    preferredOCRMethod: "default",
    saveWasm: true,
  });

  try {
    await mb.login();
   const data = await mb.getTransactionsHistory({
      accountNumber: "09999838622222",
      fromDate: "16/05/2025",
      toDate: "25/05/2025",
    });
    console.log(data)
  } catch (e) {
    const errorMsg = (e as Error).message;

    if (errorMsg.includes("GW18"))
      return console.log(
        "Test completed. The library is functioning correctly."
      );
    else throw e;
  }
})();
