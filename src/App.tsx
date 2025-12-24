import { useState, useEffect } from 'react'
import { Plus, Trash2, ShoppingCart, Check, Clock, Tag, PlusCircle } from 'lucide-react'

// 数据模型接口
interface GroceryItem {
  id: string
  name: string
  completed: boolean
  category: string
  createdAt: number
  updatedAt: number
}

// 预设类别列表
const PRESET_CATEGORIES = [
  { id: 'western', name: '洋人超市', color: 'blue' },
  { id: 'asian', name: '华人超市', color: 'red' },
  { id: 'gas', name: '加油站', color: 'green' }
] as const

// 预设类别的颜色样式
function getPresetCategoryColor(categoryName: string): string {
  const categoryInfo = PRESET_CATEGORIES.find(c => c.name === categoryName)
  if (categoryInfo) {
    switch (categoryInfo.color) {
      case 'blue': return 'blue'
      case 'red': return 'red'
      case 'green': return 'green'
    }
  }
  return 'gray'
}

// 获取类别的颜色样式
function getCategoryColorStyle(category: string, isSelected: boolean = false): string {
  const presetCategory = PRESET_CATEGORIES.find(c => c.name === category)
  
  if (presetCategory) {
    switch (presetCategory.color) {
      case 'blue':
        return isSelected ? 'bg-blue-500 text-white border-blue-500' : 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
      case 'red':
        return isSelected ? 'bg-red-500 text-white border-red-500' : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
      case 'green':
        return isSelected ? 'bg-green-500 text-white border-green-500' : 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100'
    }
  }
  
  // 自定义类别颜色（使用橙色/amber作为默认颜色）
  return isSelected ? 'bg-orange-500 text-white border-orange-500' : 'bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100'
}

// 获取类别的指示点颜色
function getCategoryDotColor(category: string): string {
  const presetCategory = PRESET_CATEGORIES.find(c => c.name === category)
  
  if (presetCategory) {
    switch (presetCategory.color) {
      case 'blue': return 'bg-blue-500'
      case 'red': return 'bg-red-500'
      case 'green': return 'bg-green-500'
    }
  }
  
  // 自定义类别使用橙色
  return 'bg-orange-500'
}

// 格式化时间显示
function formatTime(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  
  if (diff < 60000) {
    return '刚刚'
  } else if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000)
    return `${minutes}分钟前`
  } else if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000)
    return `${hours}小时前`
  } else {
    const days = Math.floor(diff / 86400000)
    return `${days}天前`
  }
}

// 生成随机颜色
function generateRandomColor(): string {
  const colors = ['pink', 'cyan', 'indigo', 'teal', 'lime', 'amber']
  return colors[Math.floor(Math.random() * colors.length)]
}

function App() {
  // 状态管理
  const [items, setItems] = useState<GroceryItem[]>([])
  const [inputValue, setInputValue] = useState('')
  const [customCategories, setCustomCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('洋人超市')
  const [customCategoryName, setCustomCategoryName] = useState('')
  const [isAddingCustom, setIsAddingCustom] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // 从localStorage加载数据
  useEffect(() => {
    const savedItems = localStorage.getItem('grocery-items')
    const savedCustomCategories = localStorage.getItem('custom-categories')
    
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems)
        // 数据迁移：为旧数据添加默认类别
        const migratedItems = parsedItems.map((item: GroceryItem) => ({
          ...item,
          category: item.category || '洋人超市'
        }))
        setItems(migratedItems)
      } catch (e) {
        console.error('Failed to parse saved items:', e)
      }
    }
    
    if (savedCustomCategories) {
      try {
        setCustomCategories(JSON.parse(savedCustomCategories))
      } catch (e) {
        console.error('Failed to parse custom categories:', e)
      }
    }
    
    setIsLoaded(true)
  }, [])

  // 将数据保存到localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('grocery-items', JSON.stringify(items))
      localStorage.setItem('custom-categories', JSON.stringify(customCategories))
    }
  }, [items, customCategories, isLoaded])

  // 添加新项目
  const addItem = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedValue = inputValue.trim()
    
    if (!trimmedValue) return

    // 确定最终类别
    let finalCategory = selectedCategory
    
    if (selectedCategory === '自定义' && customCategoryName.trim()) {
      finalCategory = customCategoryName.trim()
      
      // 如果是新的自定义类别，添加到列表中
      if (!customCategories.includes(finalCategory)) {
        setCustomCategories(prev => [...prev, finalCategory])
      }
    }

    const newItem: GroceryItem = {
      id: Date.now().toString(),
      name: trimmedValue,
      completed: false,
      category: finalCategory,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }

    setItems(prev => [newItem, ...prev])
    setInputValue('')
    
    // 如果是自定义类别，添加后重置状态
    if (selectedCategory === '自定义') {
      setCustomCategoryName('')
      setIsAddingCustom(false)
      // 切换回默认的洋人超市
      setSelectedCategory('洋人超市')
    }
  }

  // 切换项目完成状态
  const toggleItem = (id: string) => {
    setItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, completed: !item.completed, updatedAt: Date.now() }
          : item
      )
    )
  }

  // 删除项目
  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  // 清除所有已完成项目
  const clearCompleted = () => {
    setItems(prev => prev.filter(item => !item.completed))
  }

  // 移除自定义类别
  const removeCustomCategory = (categoryName: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setCustomCategories(prev => prev.filter(cat => cat !== categoryName))
    // 如果当前选中的类别被删除，重置为默认类别
    if (selectedCategory === categoryName) {
      setSelectedCategory('洋人超市')
    }
  }

  // 计算统计信息
  const totalItems = items.length
  const completedItems = items.filter(item => item.completed).length
  const pendingItems = totalItems - completedItems

  // 按状态分组
  const pendingItemsList = items.filter(item => !item.completed)
  const completedItemsList = items.filter(item => item.completed)

  // 按类别分组待购买项目
  const groupedPendingItems = pendingItemsList.reduce((groups, item) => {
    const category = item.category
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(item)
    return groups
  }, {} as Record<string, GroceryItem[]>)

  // 按类别分组已完成项目
  const groupedCompletedItems = completedItemsList.reduce((groups, item) => {
    const category = item.category
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(item)
    return groups
  }, {} as Record<string, GroceryItem[]>)

  // 类别显示顺序：预设类别 + 自定义类别列表
  const presetCategoryOrder = ['洋人超市', '华人超市', '加油站']
  
  // 获取排序后的类别列表
  const getSortedCategories = (groupedItems: Record<string, GroceryItem[]>) => {
    const categories = Object.keys(groupedItems)
    const presetInUse = presetCategoryOrder.filter(cat => categories.includes(cat))
    const customInUse = categories.filter(cat => !presetCategoryOrder.includes(cat))
    return [...presetInUse, ...customInUse]
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center">
        <div className="text-emerald-600 text-lg">加载中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100">
      <div className="max-w-md mx-auto px-4 py-8">
        
        {/* 头部标题 */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full shadow-lg mb-4">
            <ShoppingCart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">家庭购物清单</h1>
          <p className="text-gray-500">管理您的日常购物需求</p>
        </header>

        {/* 统计信息 */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex justify-around">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">{totalItems}</div>
            <div className="text-xs text-gray-500">总项目</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">{pendingItems}</div>
            <div className="text-xs text-gray-500">待购买</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">{completedItems}</div>
            <div className="text-xs text-gray-500">已完成</div>
          </div>
        </div>

        {/* 添加项目表单 */}
        <form onSubmit={addItem} className="mb-6">
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="添加购物项目，例如：牛奶、面包、西红柿..."
              className="flex-1 px-4 py-3 rounded-xl border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none transition-colors bg-white shadow-sm text-gray-700 placeholder-gray-400"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-md flex items-center"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          {/* 预设类别选择器 */}
          <div className="mb-2">
            <div className="flex items-center mb-2 text-xs text-gray-500">
              <Tag className="w-3 h-3 mr-1" />
              选择购买地点：
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESET_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category.name)
                    setIsAddingCustom(false)
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all duration-200 ${
                    selectedCategory === category.name
                      ? getCategoryColorStyle(category.name, true)
                      : getCategoryColorStyle(category.name, false)
                  }`}
                >
                  {category.name}
                </button>
              ))}
              
              {/* 已创建的自定义类别 */}
              {customCategories.map((categoryName) => (
                <button
                  key={categoryName}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(categoryName)
                    setIsAddingCustom(false)
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all duration-200 group relative ${
                    selectedCategory === categoryName
                      ? getCategoryColorStyle(categoryName, true)
                      : getCategoryColorStyle(categoryName, false)
                  }`}
                >
                  {categoryName}
                  {/* 删除自定义类别按钮 */}
                  <button
                    type="button"
                    onClick={(e) => removeCustomCategory(categoryName, e)}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    ×
                  </button>
                </button>
              ))}
              
              {/* 添加自定义类别按钮 */}
              {!isAddingCustom ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingCustom(true)
                    setSelectedCategory('自定义')
                  }}
                  className="px-3 py-1.5 rounded-full text-sm font-medium border-2 border-dashed border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400 transition-all duration-200 flex items-center"
                >
                  <PlusCircle className="w-4 h-4 mr-1" />
                  自定义
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingCustom(false)
                    setSelectedCategory('洋人超市')
                  }}
                  className="px-3 py-1.5 rounded-full text-sm font-medium border-2 border-purple-500 bg-purple-500 text-white transition-all duration-200"
                >
                  自定义
                </button>
              )}
            </div>
          </div>
          
          {/* 自定义类别输入框 */}
          {isAddingCustom && (
            <input
              type="text"
              value={customCategoryName}
              onChange={(e) => setCustomCategoryName(e.target.value)}
              placeholder="请输入自定义类别名称（如：五金店、药店）..."
              className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none transition-colors bg-white shadow-sm text-gray-700 placeholder-gray-400 text-sm mt-2"
            />
          )}
        </form>

        {/* 购物清单 */}
        <div className="space-y-6">
          
          {/* 待购买项目 - 按类别分组 */}
          {Object.keys(groupedPendingItems).length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">
                待购买 ({pendingItemsList.length})
              </h2>
              
              {getSortedCategories(groupedPendingItems).map((category) => (
                <div key={category} className="mb-4">
                  {/* 类别标题 */}
                  <div className="flex items-center mb-2 px-1">
                    <div className={`w-2 h-2 rounded-full mr-2 ${getCategoryDotColor(category)}`} />
                    <h3 className="font-semibold text-gray-700 text-sm">
                      {category}
                    </h3>
                    <span className="ml-2 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {groupedPendingItems[category].length}
                    </span>
                  </div>
                  
                  {/* 该类别下的项目列表 */}
                  <div className="space-y-2">
                    {groupedPendingItems[category].map((item) => (
                      <div
                        key={item.id}
                        className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100"
                      >
                        <div className="flex items-center p-4">
                          {/* 复选框 */}
                          <button
                            onClick={() => toggleItem(item.id)}
                            className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-emerald-400 hover:border-emerald-500 hover:bg-emerald-50 transition-colors flex items-center justify-center mr-3"
                          >
                            <div className="w-3 h-3 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                          
                          {/* 项目名称 */}
                          <span className="flex-1 text-gray-700 font-medium text-lg">
                            {item.name}
                          </span>
                          
                          {/* 时间显示 */}
                          <div className="flex items-center text-gray-400 text-xs mr-2">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTime(item.updatedAt)}
                          </div>
                          
                          {/* 删除按钮 */}
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 已完成项目 - 按类别分组 */}
          {Object.keys(groupedCompletedItems).length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">
                已完成 ({completedItemsList.length})
              </h2>
              
              {getSortedCategories(groupedCompletedItems).map((category) => (
                <div key={category} className="mb-4">
                  {/* 类别标题 */}
                  <div className="flex items-center mb-2 px-1 opacity-60">
                    <div className={`w-2 h-2 rounded-full mr-2 ${getCategoryDotColor(category)}`} />
                    <h3 className="font-semibold text-gray-600 text-sm">
                      {category}
                    </h3>
                    <span className="ml-2 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {groupedCompletedItems[category].length}
                    </span>
                  </div>
                  
                  {/* 该类别下的已完成项目列表 */}
                  <div className="space-y-2">
                    {groupedCompletedItems[category].map((item) => (
                      <div
                        key={item.id}
                        className="group bg-gray-50 rounded-xl shadow-sm overflow-hidden border border-gray-200 opacity-75"
                      >
                        <div className="flex items-center p-4">
                          {/* 复选框（已选中状态） */}
                          <button
                            onClick={() => toggleItem(item.id)}
                            className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-green-500 bg-green-500 flex items-center justify-center mr-3"
                          >
                            <Check className="w-4 h-4 text-white" />
                          </button>
                          
                          {/* 项目名称（划线状态） */}
                          <span className="flex-1 text-gray-400 font-medium text-lg line-through">
                            {item.name}
                          </span>
                          
                          {/* 时间显示 */}
                          <div className="flex items-center text-gray-400 text-xs mr-2">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTime(item.updatedAt)}
                          </div>
                          
                          {/* 删除按钮 */}
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 空状态 */}
          {items.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <ShoppingCart className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-gray-600 font-medium mb-2">购物清单为空</h3>
              <p className="text-gray-400 text-sm">添加您需要购买的物品吧！</p>
            </div>
          )}
        </div>

        {/* 清除已完成按钮 */}
        {completedItems > 0 && (
          <button
            onClick={clearCompleted}
            className="w-full mt-6 py-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors text-sm font-medium"
          >
            清除已完成项目
          </button>
        )}

        {/* 底部提示 */}
        <footer className="text-center mt-8 text-gray-400 text-sm">
          <p>数据自动保存至本地存储</p>
        </footer>
      </div>
    </div>
  )
}

export default App
