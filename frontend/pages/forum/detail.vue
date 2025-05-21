<!-- pages/post/[id].vue -->
<template>
  <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
    <!-- Post Header -->
    <div class="relative">
      <img 
        src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        loading="lazy"
        alt="Post cover image" 
        class="w-full h-48 md:h-64 object-cover"
      />
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4 md:p-6">
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <span class="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">
            {{ post.category }}
          </span>
          <span class="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
            {{ post.subcategory }}
          </span>
        </div>
        <h1 class="text-xl md:text-2xl lg:text-3xl font-bold text-white">{{ post.title }}</h1>
      </div>
    </div>

    <!-- Post Meta -->
    <div class="border-b border-gray-200">
      <div class="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="flex items-center space-x-4">
          <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
            {{ post.author.charAt(0) }}
          </div>
          <div>
            <div class="font-medium">{{ post.author }}</div>
            <div class="text-sm text-gray-500 flex flex-wrap items-center gap-1">
              <Calendar size="14" class="mr-1" />
              <span>{{ post.date }}</span>
              <span class="mx-2 hidden sm:inline">•</span>
              <Clock size="14" class="mr-1" />
              <span>{{ post.readTime }} phút đọc</span>
            </div>
          </div>
        </div>
        
        <div class="flex items-center space-x-3">
          <button class="flex items-center text-gray-500 hover:text-blue-600">
            <Bookmark size="18" />
          </button>
          <button class="flex items-center text-gray-500 hover:text-blue-600">
            <Share2 size="18" />
          </button>
          <el-dropdown trigger="click">
            <button class="flex items-center text-gray-500 hover:text-blue-600">
              <MoreHorizontal size="18" />
            </button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <div class="flex items-center">
                    <Flag size="14" class="mr-2" />
                    <span>Báo cáo</span>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div class="flex items-center">
                    <Link size="14" class="mr-2" />
                    <span>Sao chép liên kết</span>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      
  
    </div>

    <!-- Post Content -->
    <div class="p-4 md:p-6">
      <div class="prose prose-sm md:prose-base lg:prose-lg max-w-none">
        <p class="font-medium text-base md:text-lg">{{ post.summary }}</p>
        
        <p v-for="(paragraph, index) in post.content" :key="index" class="mb-4">
          {{ paragraph }}
        </p>

      </div>

      <!-- Tags -->
      <div class="mt-8 pt-6 border-t border-gray-200">
        <div class="flex flex-wrap gap-2">
          <span v-for="(tag, index) in post.tags" :key="index" 
                class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs md:text-sm hover:bg-gray-200 cursor-pointer">
            #{{ tag }}
          </span>
        </div>
      </div>

      <div class="px-4 md:px-6 pb-4 flex space-x-4">
        <div class="flex items-center space-x-1">
          <ThumbsUp size="16" class="text-gray-500" />
          <span class="text-sm text-gray-500">{{ post.likes }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <MessageSquare size="16" class="text-gray-500" />
          <span class="text-sm text-gray-500">{{ post.comments }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <Eye size="16" class="text-gray-500" />
          <span class="text-sm text-gray-500">{{ post.views }}</span>
        </div>
      </div>
    </div>

    <!-- Comments -->
    <div class="p-4 md:p-6 bg-gray-50 border-t border-gray-200">
      <h3 class="text-lg md:text-xl font-bold mb-6">Bình luận ({{ post.comments }})</h3>
      
      <!-- Comment form -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-start gap-4">
          <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium hidden sm:flex">
            U
          </div>
          <div class="flex-1">
            <el-input
              v-model="commentText"
              type="textarea"
              placeholder="Viết bình luận của bạn..."
              rows="3"
            />
            <div class="mt-2 flex justify-end">
              <el-button type="primary">Đăng bình luận</el-button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Comment list -->
      <div>
        <div v-for="(comment, index) in post.commentList" :key="index" 
             class="border-b border-gray-200 last:border-b-0 py-4 md:py-6 first:pt-0">
          <div class="flex items-start gap-3 md:gap-4">
            <div class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
              {{ comment.user.charAt(0) }}
            </div>
            <div class="flex-1">
              <div class="flex items-start justify-between">
                <div>
                  <div class="font-medium">{{ comment.user }}</div>
                  <div class="text-xs md:text-sm text-gray-500">{{ comment.time }}</div>
                </div>
                <button class="text-gray-500 hover:text-gray-700">
                  <MoreVertical size="16" />
                </button>
              </div>
              <div class="mt-2">
                <p class="text-sm md:text-base">{{ comment.text }}</p>
              </div>
              <div class="mt-3 flex items-center gap-4">
                <button class="flex items-center text-gray-500 hover:text-blue-600 text-xs md:text-sm">
                  <ThumbsUp size="14" class="mr-1" />
                  <span>Thích ({{ comment.likes }})</span>
                </button>
                <button class="flex items-center text-gray-500 hover:text-blue-600 text-xs md:text-sm">
                  <Reply size="14" class="mr-1" />
                  <span>Trả lời</span>
                </button>
              </div>
              
              <!-- Nested replies -->
              <div v-if="comment.replies && comment.replies.length > 0" class="mt-4 pl-3 md:pl-6 border-l-2 border-gray-200">
                <div v-for="(reply, replyIndex) in comment.replies" :key="replyIndex" 
                     class="mt-4 first:mt-0">
                  <div class="flex items-start gap-2 md:gap-3">
                    <div class="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                      {{ reply.user.charAt(0) }}
                    </div>
                    <div class="flex-1">
                      <div class="flex items-start justify-between">
                        <div>
                          <div class="font-medium text-sm">{{ reply.user }}</div>
                          <div class="text-xs text-gray-500">{{ reply.time }}</div>
                        </div>
                        <button class="text-gray-500 hover:text-gray-700">
                          <MoreVertical size="14" />
                        </button>
                      </div>
                      <div class="mt-1">
                        <p class="text-xs md:text-sm">{{ reply.text }}</p>
                      </div>
                      <div class="mt-2 flex items-center gap-3 md:gap-4">
                        <button class="flex items-center text-gray-500 hover:text-blue-600 text-xs">
                          <ThumbsUp size="12" class="mr-1" />
                          <span>Thích ({{ reply.likes }})</span>
                        </button>
                        <button class="flex items-center text-gray-500 hover:text-blue-600 text-xs">
                          <Reply size="12" class="mr-1" />
                          <span>Trả lời</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Show more comments -->
      <div class="mt-4 text-center">
        <el-button type="default" plain>Xem thêm bình luận</el-button>
      </div>
    </div>

    <!-- Related posts -->
    <div class="p-4 md:p-6 border-t border-gray-200">
      <h3 class="text-lg md:text-xl font-bold mb-4 md:mb-6">Bài viết liên quan</h3>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <div v-for="(relatedPost, index) in post.relatedPosts" :key="index" 
             class="flex items-start gap-3">
          <div class="w-20 h-14 md:w-24 md:h-16 bg-gray-200 rounded">
            <img 
              src="https://fqa.vn/_ipx/f_webp,s_40x40/https://minio.ftech.ai/fqa/social/avatar/d33fbec2-e7e0-417f-bc7f-76ece9bd6cda_1740754133_400x150.png" 
              alt="Related post thumbnail" 
              class="w-full h-full object-cover rounded"
            />
          </div>
          <div class="flex-1">
            <h4 class="font-medium text-sm md:text-base line-clamp-2 mb-1 hover:text-blue-600">
              <a href="#">{{ relatedPost.title }}</a>
            </h4>
            <div class="text-xs md:text-sm text-gray-500">{{ relatedPost.date }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  Calendar, Clock, ThumbsUp, MessageSquare, Eye, Bookmark, Share2, 
  MoreHorizontal, Flag, Link, Copy, UserPlus, Mail, MoreVertical, Reply
} from 'lucide-vue-next'

const commentText = ref('')

// Sample post data (in a real app, this would come from an API)
const post = {
  id: 1,
  title: 'Hỗn hợp X gồm 2 amino axit A và B đều có công thức dạng H₂N-(CH₂)n-COOH',
  category: 'Hóa Học',
  subcategory: 'Lớp 12',
  author: 'ThS. Nguyen Van Hoa',
  authorBio: 'Giáo viên chuyên Hóa học tại Trường THPT Chuyên Hà Nội - Amsterdam với hơn 15 năm kinh nghiệm giảng dạy.',
  date: '15 tháng 4, 2025',
  readTime: 8,
  likes: 124,
  comments: 18,
  views: 3452,
  summary: 'Bài viết này sẽ phân tích chi tiết cách giải bài toán về hỗn hợp amino axit, một dạng bài thường xuất hiện trong đề thi đại học khối A, B.',
  content: [
    'Amino axit là những hợp chất hữu cơ chứa đồng thời nhóm amino (-NH₂) và nhóm cacboxyl (-COOH). Đây là những hợp phần cấu tạo nên protein và đóng vai trò quan trọng trong nhiều quá trình sinh học.',
    'Trong bài toán này, chúng ta cần xác định công thức phân tử của hai amino axit A và B khi biết thông tin về sản phẩm đốt cháy và thủy phân chúng.',
    'Trước tiên, từ dữ kiện bài toán, ta biết rằng cả A và B đều có công thức dạng H₂N-(CH₂)n-COOH với n khác nhau. Điều này có nghĩa là chúng khác nhau về số nhóm -CH₂- trong phân tử.',
    'Quy ước số mol của amino axit A là x mol và amino axit B là y mol, với tổng x + y = 0,1 mol.',
    'Khi đốt cháy hoàn toàn hỗn hợp, phản ứng xảy ra theo phương trình: C_(n+2)H_(2n+3)NO₂ + O₂ → (n+2)CO₂ + (n+1,5)H₂O + 0,5N₂',
    'Từ đây, ta có thể thiết lập hệ phương trình dựa trên số mol CO₂ và H₂O thu được, kết hợp với điều kiện về tổng số mol ban đầu để tìm ra giá trị n của mỗi amino axit.',
    'Sau khi giải hệ phương trình, ta xác định được amino axit A có n = 1 (glycine, C₂H₅NO₂) và amino axit B có n = 4 (norvaline hoặc isovaline, C₅H₁₁NO₂).'
  ],
  codeExample: `// Giải hệ phương trình bằng JavaScript
function solveEquation() {
  // x + y = 0.1
  // (n_A + 2)x + (n_B + 2)y = 0.5 (từ CO₂)
  // (n_A + 1.5)x + (n_B + 1.5)y = 0.3 (từ H₂O)
  
  // Giả sử n_A = 1, n_B = 4
  const n_A = 1, n_B = 4;
  
  // Hệ phương trình trở thành:
  // x + y = 0.1
  // 3x + 6y = 0.5
  // 2.5x + 5.5y = 0.3
  
  // Giải hệ phương trình
  const x = (0.5 - 6*0.1) / (3 - 6); // = 0.05
  const y = 0.1 - x; // = 0.05
  
  console.log(\`x = \${x}, y = \${y}\`);
  return { x, y };
}`,
  image: true,
  imageCaption: 'Cấu trúc phân tử của glycine (H₂N-CH₂-COOH) và norvaline (H₂N-(CH₂)₄-COOH)',
  table: {
    headers: ['Amino axit', 'Công thức phân tử', 'n', 'Khối lượng phân tử (g/mol)'],
    rows: [
      ['Glycine (A)', 'C₂H₅NO₂', '1', '75'],
      ['Norvaline (B)', 'C₅H₁₁NO₂', '4', '117']
    ]
  },
  quote: {
    text: 'Hóa học hữu cơ là ngành khoa học rất thú vị và áp dụng nhiều trong thực tiễn, đặc biệt là trong lĩnh vực thực phẩm, dược phẩm và vật liệu mới.',
    author: 'GS. Nguyễn Văn A, Viện Hóa học'
  },
  tags: ['hóa học', 'amino axit', 'hóa hữu cơ', 'bài tập', 'ôn thi đại học'],
  commentList: [
    {
      user: 'Trần Minh Anh',
      time: '14 phút trước',
      text: 'Cảm ơn thầy rất nhiều. Em đã hiểu cách giải bài toán này rồi. Chỉ còn một thắc mắc nhỏ: Tại sao trong phương trình đốt cháy lại có hệ số 0,5 trước N₂?',
      likes: 5,
      replies: [
        {
          user: 'ThS. Nguyen Van Hoa',
          time: '10 phút trước',
          text: 'Chào em, hệ số 0,5 trước N₂ là do trong phân tử amino axit chỉ có 1 nguyên tử N, khi đốt cháy hoàn toàn, mỗi nguyên tử N sẽ tạo ra 1/2 phân tử N₂.',
          likes: 2
        },
        {
          user: 'Trần Minh Anh',
          time: '8 phút trước',
          text: 'Em hiểu rồi ạ, cảm ơn thầy!',
          likes: 1
        }
      ]
    },
    {
      user: 'Nguyễn Thị Hương',
      time: '45 phút trước',
      text: 'Bài viết rất chi tiết và dễ hiểu. Em có thắc mắc là có cách nào khác để giải bài toán này không ạ?',
      likes: 3,
      replies: []
    }
  ],
  relatedPosts: [
    {
      id: 2,
      title: 'Phương pháp xác định công thức phân tử hợp chất hữu cơ',
      date: '12 tháng 4, 2025'
    },
    {
      id: 3,
      title: 'Bài tập về phản ứng este hóa và xà phòng hóa',
      date: '10 tháng 4, 2025'
    },
    {
      id: 4,
      title: 'Tổng hợp các dạng bài tập Hóa học hữu cơ hay gặp trong đề thi',
      date: '8 tháng 4, 2025'
    },
    {
      id: 5,
      title: 'Phương pháp giải nhanh bài toán về lượng chất trong phản ứng hóa học',
      date: '5 tháng 4, 2025'
    }
  ]
}
</script>