import { Router, Request, Response } from "express";
import MB from "../MB";
import config from "../../config.json";
const router = Router();
const mb = new MB({
  username: config.username,
  password: config.password,
  preferredOCRMethod: "default",
  saveWasm: true,
});
router.get(
  "/bank/transaction-history",
  async (req: Request, res: Response): Promise<void> => {
    try {
      await mb.login();
      const data = await mb.getTransactionsHistory({
        accountNumber: "09999838622222",
        fromDate: "16/05/2025",
        toDate: "25/05/2025",
      });

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json(String(error));
    }
  }
);

router.get(
  "/bank/balance",
  async (req: Request, res: Response): Promise<void> => {
    try {
      await mb.login();
      const balance = await mb.getBalance();
      res.status(200).json(balance);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

export default router;
