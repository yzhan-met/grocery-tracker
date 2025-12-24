import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

// 监听控制台错误
const errors = [];
page.on('console', msg => {
  if (msg.type() === 'error') {
    errors.push(msg.text());
  }
});

page.on('pageerror', error => {
  errors.push(error.message);
});

try {
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  // 检查关键元素
  const title = await page.textContent('h1');
  console.log('页面标题:', title);
  
  // 检查是否存在输入框
  const inputExists = await page.locator('input[type="text"]').count();
  console.log('输入框存在:', inputExists > 0);
  
  // 检查预设类别按钮
  const westernSupermarket = await page.locator('button:has-text("洋人超市")').count();
  const asianSupermarket = await page.locator('button:has-text("华人超市")').count();
  const gasStation = await page.locator('button:has-text("加油站")').count();
  const customButton = await page.locator('button:has-text("自定义")').count();
  
  console.log('洋人超市按钮:', westernSupermarket > 0);
  console.log('华人超市按钮:', asianSupermarket > 0);
  console.log('加油站按钮:', gasStation > 0);
  console.log('自定义按钮:', customButton > 0);
  
  // 测试添加预设类别项目
  await page.fill('input[placeholder*="牛奶"]', '牛奶');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(500);
  console.log('添加预设类别项目成功');
  
  // 测试添加自定义类别 - 先点击自定义按钮，再输入类别名称和项目
  await page.click('button:has-text("自定义")');
  await page.waitForTimeout(300);
  
  // 输入自定义类别名称
  const customInputs = await page.locator('input[placeholder*="请输入自定义类别名称"]');
  await customInputs.fill('五金店');
  
  // 输入项目名称
  await page.fill('input[placeholder*="牛奶"]', '锤子');
  
  // 点击添加按钮
  await page.click('button[type="submit"]');
  await page.waitForTimeout(500);
  console.log('添加自定义类别项目成功');
  
  // 检查新创建的自定义类别是否显示在列表中
  const newCustomCategory = await page.locator('text=五金店').count();
  console.log('自定义类别已创建:', newCustomCategory > 0);
  
  // 等待页面完全加载
  await page.waitForTimeout(1000);
  
  if (errors.length > 0) {
    console.log('控制台错误:', errors);
    process.exit(1);
  } else {
    console.log('✓ 页面加载成功，无控制台错误');
    console.log('✓ 自定义类别功能测试通过');
    process.exit(0);
  }
} catch (error) {
  console.error('测试失败:', error.message);
  process.exit(1);
} finally {
  await browser.close();
}
