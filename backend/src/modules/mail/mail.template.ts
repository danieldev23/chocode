export const templateEmail = (
  jobTitle: string,
  jobDetail: string,
  jobSlug: string,
  location: string,
  salary: string,
  time: string,
  today: string,
) => {
  return `
  <!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CHOCODE - Thông Báo Việc Làm Mới</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body style="
      font-family: 'Poppins', Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f0f4fa;
      color: #333;
      line-height: 1.6;">
    
    <div style="
        max-width: 600px;
        margin: 2rem auto;
        background-color: #ffffff;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        border-radius: 16px;
        overflow: hidden;">
      
      <!-- Header with gradient -->
      <div style="
          background: linear-gradient(135deg, #3053a4 0%, #6a11cb 100%);
          padding: 2rem;
          text-align: center;">
        <img src="http://i.ibb.co/HLtWXchw/banner2.webp" alt="CHOCODE Logo" style="height: 150px; width: 100%; margin-bottom: 1rem;" />
        <h1 style="
            color: white;
            margin: 0;
            font-size: 24px;
            font-weight: 600;">Thông Báo Việc Làm Mới</h1>
        <p style="color: rgba(255, 255, 255, 0.9); margin: 0.5rem 0 0; font-size: 16px;">
          Cập nhật ngày ${today}
        </p>
      </div>
      
      <div style="padding: 2rem;">
        <div style="
            background-color: #f8faff;
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            border-left: 4px solid #6a11cb;">
          <h2 style="
              font-size: 20px;
              font-weight: 600;
              color: #2b4d8f;
              margin-top: 0;
              margin-bottom: 1rem;
              display: flex;
              align-items: center;
              gap: 0.75rem;">
            <span>Cơ Hội Việc Làm Mới Nhất</span>
            <span style="
                background-color: #ff6b6b;
                color: white;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;">MỚI</span>
          </h2>
          <p style="font-size: 16px; margin-bottom: 0;">
            <strong>Việc làm mới</strong> phù hợp với kỹ năng và sở thích của bạn
          </p>
        </div>

        <!-- Job Card -->
        <div style="
            border-radius: 14px;
            padding: 1.5rem;
            background-color: #ffffff;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            border-left: 5px solid #3053a4;
            margin-bottom: 1.5rem;
            transition: transform 0.3s ease;">
          
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
            <div>
              <h3 style="
                  font-size: 18px;
                  font-weight: 600;
                  color: #2b4d8f;
                  margin-top: 0;
                  margin-bottom: 0.75rem;">
                ${jobTitle}
              </h3>
              <p style="
                  display: flex;
                  align-items: center;
                  font-weight: 500;
                  color: #6a11cb;
                  margin: 0.5rem 0;">
                <span style="
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background-color: #6a11cb;
                    margin-right: 8px;"></span>
                APA Tech
              </p>
            </div>
            <!-- <img src="/api/placeholder/50/50" alt="Company Logo" style="border-radius: 8px; width: 50px; height: 50px;" /> -->
          </div>

          <div style="
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              gap: 0.75rem;
              margin-bottom: 1.25rem;">
            <span style="
                background-color: #ecf4ff;
                color: #3053a4;
                padding: 6px 14px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 500;">
                📍 ${location}
            </span>
            <span style="
                background-color: #f0f0f0;
                color: #555;
                padding: 6px 14px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 500;">
                💵 ${salary}
            </span>
            <span style="
                background-color: #fff1da;
                color: #ff8800;
                padding: 6px 14px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 500;">
                ⏰ ${time}
            </span>
          </div>

          <div style="
              background-color: #f8faff;
              border-radius: 10px;
              padding: 1rem;
              margin-bottom: 1.25rem;">
            <p style="
                color: #444;
                font-size: 15px;
                margin: 0;
                line-height: 1.6;">
              ${jobDetail}
            </p>
          </div>

          <div style="display: flex; gap: 1rem;">
            <a href="#" style="
                flex: 1;
                display: inline-block;
                background: linear-gradient(135deg, #3053a4 0%, #5472d3 100%);
                color: white;
                padding: 12px 20px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                font-size: 15px;
                border: none;
                cursor: pointer;
                text-align: center;
                box-shadow: 0 4px 12px rgba(84, 114, 211, 0.25);
                transition: all 0.3s ease;">
              Xem chi tiết
            </a>
            <a href="#" style="
                display: inline-block;
                background-color: #ecf4ff;
                color: #3053a4;
                padding: 12px 20px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                font-size: 15px;
                border: none;
                cursor: pointer;
                text-align: center;
                transition: all 0.3s ease;">
              Lưu
            </a>
          </div>
        </div>

        <div style="text-align: center; margin-top: 2rem;">
          <a href="#" style="
              display: inline-block;
              background-color: #f0f4fa;
              color: #3053a4;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              font-size: 15px;
              border: 1px solid #d0e0ff;
              cursor: pointer;
              transition: all 0.3s ease;">
            Xem tất cả việc làm
          </a>
        </div>
        
        <div style="
            margin-top: 2rem;
            text-align: center;
            padding-top: 1.5rem;
            border-top: 1px solid #eaeef5;
            color: #888;
            font-size: 14px;">
          <p>
            © 2025 CHOCODE. Tất cả các quyền được bảo lưu.<br>
            Bạn nhận được email này vì bạn đã đăng ký nhận thông báo việc làm từ CHOCODE.
          </p>
          <p>
            <a href="#" style="color: #3053a4; text-decoration: none; margin: 0 0.5rem;">Hủy đăng ký</a> | 
            <a href="#" style="color: #3053a4; text-decoration: none; margin: 0 0.5rem;">Cài đặt</a> | 
            <a href="#" style="color: #3053a4; text-decoration: none; margin: 0 0.5rem;">Trợ giúp</a>
          </p>
        </div>
      </div>
    </div>
  </body>
</html>
`;
};
