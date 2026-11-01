// 唯一内容来源：每个项目只写一次，用 abilities 关联十二个入口。
(() => {
  const img = (project, name, caption) => ({ src: `assets/projects/${project}/${name}.webp`, alt: caption, caption });
  const picture = image => ({ type: 'image', ...image });
  const pair = (...images) => ({ type: 'pair', images });
  const section = (id, title, paragraphs, blocks = []) => ({ id, title, paragraphs, blocks });
  window.PORTFOLIO = {
    name: '梅子甜',
    headingEnglish: {
      "梅子甜": "Mei Zitian",
      "个人作品集": "Portfolio",
      "能力分类": "Selected abilities",
      "获奖与荣誉": "Awards & honors",
      "技能": "Skills",
      "联系我": "Get in touch",
      "需求洞察与方案判断": "Understanding needs & choosing solutions",
      "设计转化与制作落地": "Design, patterns & making",
      "信息整理与协同推进": "Information & coordination",
      "创意构建与视觉表达": "Creative concepts & visual expression",
      "需求识别": "Understanding needs",
      "市场与商品研究": "Market & product research",
      "方案比较与推荐": "Comparing & recommending",
      "结构与纸样": "Structure & patterns",
      "三维建模与模拟": "3D modeling & simulation",
      "样品检查与修改": "Sample checks & alterations",
      "数据与信息整理": "Data & information",
      "流程与节点管理": "Process & follow-up",
      "沟通协调与异常处理": "Communication & problem-solving",
      "概念与故事构建": "Concepts & storytelling",
      "视觉系统与应用延展": "Visual identity & applications",
      "AI辅助与动态表达": "AI-assisted visuals & motion",
      "黎巴嫩 IP 童装定制": "Lebanon · Character-inspired childrenswear",
      "松间 · 日常轻机能商品企划": "Songjian · Everyday outdoor-inspired apparel",
      "印度童装混款选样与订单跟进": "India · Mixed-style sampling & order follow-up",
      "织物遗境": "Woven Remnants",
      "西装纸样与成衣": "Suit · Patterns & finished garment",
      "花旦 · 纸样与三维形态": "Huadan · Patterns & 3D form",
      "男装结构课程 · 夹克、衬衫与牛仔裤": "Menswear construction · Jacket, shirt & jeans",
      "立裁 · 褶裥与体积练习": "Draping · Pleats & volume",
      "H&M 绍兴门店调研": "H&M · Shaoxing store research",
      "跳呱 1934": "Tiaogua 1934",
      "地中海与热带花卉 · 亲子泳装图案": "Mediterranean & tropical prints · Family swimwear",
      "AI 商品视频练习": "AI product video studies",
      "先问清楚，哪些细节要保留": "Deciding which details to keep",
      "三款面料，放在一起比一比": "Comparing three fabrics",
      "一起调整扣子和领口的做法": "Working out buttons & neckline details",
      "确认好数据，再整理工艺单": "Confirming details & preparing the tech pack",
      "样品目前做到哪一步": "Where the sample stands now",
      "需求确认": "Confirming requirements",
      "面料与色卡": "Fabrics & color swatches",
      "扣子与领口": "Buttons & neckline",
      "样品范围": "Sample scope",
      "尺寸与工艺单": "Measurements & tech pack",
      "制作跟进": "Production follow-up",
      "目前进度": "Current progress",
      "为什么选择日常轻机能": "Why everyday outdoor-inspired apparel",
      "按季节与场景安排商品": "Planning by season & occasion",
      "行云机能裤的初步想法": "The Xingyun pants concept",
      "把品牌想法放进门店空间": "Bringing the brand into a store concept",
      "先问清楚怎么混款": "Clarifying the style mix",
      "每款尺码都再确认一遍": "Checking sizes, style by style",
      "缺货后，换个相似款试试": "Finding an alternative when stock runs out",
      "继续跟进选样和打包": "Following up on sampling & packing",
      "确认范围": "Confirming the scope",
      "整理选样": "Organizing the selection",
      "处理缺货": "Finding replacements",
      "继续跟进": "Following up",
      "系列主题从哪里来": "Where the collection began",
      "用三维模拟检查造型": "Checking the silhouette in 3D",
      "白坯试穿：把“轻微堆叠”说清楚": "Calico fitting · Clarifying the trouser break",
      "和工作室确认制作细节": "Discussing details with the workshop",
      "从纸样到成衣": "From pattern to garment",
      "先看纸样怎么分片": "Looking at the pattern pieces",
      "再看模型的正面和背面": "Front & back views in 3D",
      "从款式图画到结构图": "From flats to construction drawings",
      "在人台上试着做出形状": "Exploring form on the dress stand",
      "问卷里，我想了解什么": "What I wanted to ask",
      "这次调研里，我做了什么": "My part in the research",
      "铁皮青蛙的新故事": "A new story for the tin frog",
      "给跳呱做表情和应用": "Expressions & applications",
      "把跳呱做成一段视频": "Bringing Tiaogua into motion",
      "先想一想，谁会在哪里穿": "Who it is for & where it is worn",
      "地中海和热带花卉，两种感觉": "Two themes · Mediterranean & tropical",
      "把图案用到亲子款式上": "Applying prints to family swimwear",
      "两段成片，分别看看": "Two finished video studies",
      "服装设计与制作": "Fashion design & garment making",
      "数字设计与内容制作": "Digital design & content creation",
      "办公与业务整理": "Office tools & business organization",
      "我的职责": "My role",
      "主要交付": "What I made",
      "产出与当前状态": "Outputs & current status",
      "名称": "Name",
      "颁发单位或赛事": "Organization",
      "等级": "Level",
      "时间": "Date"
},
    intro: { src: 'assets/intro.mp4', poster: 'assets/intro-poster.jpg', duration: 4 },
    categories: [
      { id:'insight',title:'需求洞察与方案判断',color:'#cc6b57',light:'#efa08b',dark:'#ba4f3f',items:[
        {id:'needs',title:'需求识别',description:'先问清楚怎么用、有哪些限制，再确认客户最在意什么。'},
        {id:'research',title:'市场与商品研究',description:'从观察、问卷和资料里找线索，再说说我是怎么做选择的。'},
        {id:'recommendation',title:'方案比较与推荐',description:'把几个方案放在一起比较，说清楚各自的差别和推荐理由。'}
      ]},
      { id:'making',title:'设计转化与制作落地',color:'#628fa8',light:'#a6cbdc',dark:'#497992',items:[
        {id:'pattern',title:'结构与纸样',description:'从设计图到纸样，再到缝制，看看衣服是怎么做出来的。'},
        {id:'modeling',title:'三维建模与模拟',description:'把纸样做成三维模型，从不同角度看造型，再调整细节。'},
        {id:'sample',title:'样品检查与修改',description:'试穿后找出不合适的地方，把要改的位置和尺寸说清楚。'}
      ]},
      { id:'coordination',title:'信息整理与协同推进',color:'#c4849a',light:'#edbbcb',dark:'#ae667e',items:[
        {id:'information',title:'数据与信息整理',description:'把聊天里的零散要求整理成表格和资料，方便核对、交接。'},
        {id:'workflow',title:'流程与节点管理',description:'记清楚先做什么、交给谁，以及下一步还要跟进什么。'},
        {id:'communication',title:'沟通协调与异常处理',description:'遇到缺货或意见不一致时，先说明情况，再一起找办法。'}
      ]},
      { id:'expression',title:'创意构建与视觉表达',color:'#68aaa1',light:'#abe0d6',dark:'#4b8e86',items:[
        {id:'concept',title:'概念与故事构建',description:'从一个灵感出发，慢慢确定主题、造型和颜色。'},
        {id:'visual',title:'视觉系统与应用延展',description:'把同一组形象、图案和颜色，用到不同的设计里。'},
        {id:'ai-motion',title:'AI辅助与动态表达',description:'看看 AI 参与的视觉作品和视频，以及我在其中做的事。'}
      ]}
    ],
    projects: [
      {
        id:'lebanon',name:'黎巴嫩 IP 童装定制',type:'真实业务 · 样品开发',
        summary:'客户希望衣服还原角色，也适合孩子平时穿。我和客户逐项确认面料、尺寸和做法，再整理给工厂。',
        role:'我负责需求沟通、三款面料比较、信息整理、工艺单与样品跟进；工厂负责制作。',
        status:'已形成 USD 100 样品单，工厂也发来了实拍。我还没收到实物，未完成验收；爱心工艺还在确认中。',
        deliverables:'面料比较表、尺寸确认资料、工艺单、样品推进记录',
        cover:img('lebanon','lebanon-swatches','三款面料的实拍画面，截自当时的聊天视频。'),
        abilities:{needs:'requirements',recommendation:'fabrics',information:'handoff',workflow:'process',communication:'details'},
        sections:[
          section('requirements','先问清楚，哪些细节要保留',[
            '客户发来了角色参考，希望保留颜色和关键细节，也希望孩子平时能穿。我逐项确认外观、触感、尺寸和扣子位置，问清楚哪些细节必须保留，哪些做法可以商量。',
            '我根据客户对用途和舒适性的描述继续追问。下面选了几条与穿着要求有关的消息，完整角色参考没有公开展示。'
          ],[picture(img('lebanon','lebanon-requirement','已裁去身份与角色图的需求片段：客户强调日常穿着、触感与护理。'))]),
          section('fabrics','三款面料，放在一起比一比',[
            '我拿到三款面料，比较了成分、克重、价格和手感，整理成表格，再把实拍和色卡发给客户。三款价格差不多，我摸下来觉得冰棉更软、有凉感，也没有明显厚很多，便推荐了它。客户最后接受了这个建议。',
            '这里说的柔软和凉感是我的手感判断，没有做过性能检测；表格里的特性描述也按这个范围理解。'
          ],[{type:'info',rows:[{label:'0997#',value:'93%棉、7%氨纶，220—230g'},{label:'0621# / 158791#',value:'两款均为180g；具体成分见原始比较表'},{label:'推荐依据',value:'价差不大，结合触感、颜色与儿童日常穿着用途；未做功能检测'}]},picture(img('lebanon','lebanon-fabric-table','我整理的原始面料表；Features 栏不是检测报告。'))]),
          section('details','一起调整扣子和领口的做法',[
            '黄色扣一开始考虑做成可调节的。聊过之后，客户提出保留固定装饰扣、从后侧闭合，我建议用魔术贴。最后的做法是我们一起讨论出来的。',
            '蓝色领口找不到匹配的材料时，我提出了替代做法。当时我没有先问师傅，而是在客户同意后把要求传给工厂；后来我确认，工厂按商定的方案制作了。'
          ],[picture(img('lebanon','lebanon-button-discussion','客户提出固定装饰扣和后侧闭合，我们在此基础上共同调整做法。'))]),
          section('handoff','确认好数据，再整理工艺单',[
            '我先把最终数据全部确认好，再参考公司模板，自己整理工艺单交给工厂。',
            '下面这张图是早期确认尺寸时用的，袖长后来还改过，所以它只是过程记录，并非最终工艺单。'
          ],[picture(img('lebanon','lebanon-size-diagram','早期尺寸确认图，非最终版；保留原分辨率，支持放大查看。'))]),
          section('process','样品目前做到哪一步',[
            '平台上的样品单是100美元，显示6个产品，这个数字指平台产品数。工厂发来了实拍，我还没拿到实物，爱心工艺也还在确认中。'
          ],[{type:'timeline',items:[
            {title:'需求确认',text:'我与客户确认角色还原、儿童日常穿着及关键细节。'},
            {title:'面料与色卡',text:'我比较三款实物并整理表格，交给客户选择。'},
            {title:'扣子与领口',text:'我解释限制，与客户共同调整，再向制作端传达。'},
            {title:'样品范围',text:'确认报价与样品范围，形成100美元样品单。'},
            {title:'尺寸与工艺单',text:'我核对最终数据，参考公司模板整理后交给工厂。'},
            {title:'制作跟进',text:'制作端提供实拍，我继续跟进尚待确认的工艺。'},
            {title:'目前进度',text:'爱心工艺还在确认，我还没收到实物，暂时无法验收。'}
          ]},pair(img('lebanon','lebanon-order','平台 USD 100 / 6 products 样品记录，商品缩略图与身份信息已处理。'),img('lebanon','lebanon-heart-status','爱心工艺的沟通片段，当时还没有确认。'))])
        ]
      },
      {
        id:'songjian',name:'松间 · 日常轻机能商品企划',type:'课程小组 · 品牌与商品概念',team:'五人小组',
        summary:'从日常穿衣时的闷热、难搭配问题出发，我参与确定松间的轻机能方向，并规划款式、波段和门店概念。',
        role:'我负责定位、核心需求、差异化、始祖鸟对标、文化风格、行云裤概念、各波段款式规划及线下门店设计。',
        status:'已完成课程企划。行云裤和门店都停留在概念阶段，行云裤没有做功能结构或测试；方案中的经营指标是目标，还没有实际业绩。',
        deliverables:'定位与竞品对标、波段款式规划、核心商品概念、门店概念',
        cover:img('songjian','store','松间门店空间与动线的 AI 辅助概念示意，不是运营中的真实门店。'),
        abilities:{research:'positioning',needs:'positioning',recommendation:'assortment',concept:'concept',visual:'space'},
        sections:[
          section('positioning','为什么选择日常轻机能',[
            '平时聊天、观察穿着和看网络评论时，我留意到“闷热、难搭配”这些问题。它们给了我方向，但我没有做系统问卷或统计评论比例。',
            '参考始祖鸟时，我觉得课程设定的人群更需要日常穿着的舒适和方便，不一定需要专业户外性能。因此，我把方向定在日常轻机能。'
          ]),
          section('assortment','按季节与场景安排商品',[
            '我参考资料与 AI 建议，根据季节和使用场景决定款式、款数和拟定价格。上装覆盖温度与场景变化；裤装强调百搭、方便活动；配饰保持简约实用。',
            '配色用了低饱和度的自然色。“百搭”当时只是方向，没有继续做完整的单品搭配。价格参考了竞品和目标预算，具体怎么算的现在记不清了，也没有核算成本和毛利。'
          ],[{type:'info',rows:[{label:'上装',value:'覆盖不同温度与通勤场景，保留款式变化'},{label:'裤装',value:'强调百搭与活动便利，未完成整套搭配验证'},{label:'配饰',value:'简约实用，与低饱和度自然色系协调'}]}]),
          section('concept','行云机能裤的初步想法',[
            '我希望行云机能裤适合日常穿、舒服，也方便活动。目前只完成了概念，没有继续做功能结构、面料性能或穿着测试。',
            '下面选的是原概念板的一部分，主要看造型和视觉方向。'
          ],[picture(img('songjian','concept','行云裤 AI 辅助概念视觉局部，未制作或验证为功能产品。'))]),
          section('space','把品牌想法放进门店空间',[
            '我想让门店也有自然、放松的感觉，所以在概念里安排了陈列、休息和交流空间。图里是课程的空间设想，没有实际建店。',
            '企划里写到的库存、售罄和连带指标都是方案目标，还没有实际运营数据。'
          ],[picture(img('songjian','identity','课程品牌“松间”的标识和概念图。'))])
        ]
      },
      {
        id:'india',name:'印度童装混款选样与订单跟进',type:'真实业务 · 选样与协调',
        summary:'客户想小批量混款选样。我逐款确认尺码，遇到缺货就找有库存的相似款，再继续跟进选样和打包。',
        role:'我负责需求确认、款尺对应、信息复述、缺货替款沟通与选样跟进；供货端提供商品和打包记录。',
        status:'客户已同意替款，供货端也发来了打包记录。最终付款、发货、签收和清关结果仍未核实。',
        deliverables:'混款需求确认、款尺对应信息、替款反馈、选样与打包记录',
        cover:img('india','india-packing','供货端发来的选样打包照片，记录当时的打包进度。'),
        abilities:{needs:'requirements',recommendation:'replacement',information:'information',workflow:'followup',communication:'replacement'},
        sections:[
          section('requirements','先问清楚怎么混款',[
            '客户想先看样品，少量选一些组合和单品。我继续问清楚男童还是女童、要哪种组合，以及孩子的年龄范围。',
            '客户提出更大年龄与130/140尺码时，我说明现有供货限制，并回复继续查找适合的款式。'
          ],[picture(img('india','india-mixed-request','客户的小批混款需求原始消息，已删除身份信息。'))]),
          section('information','每款尺码都再确认一遍',[
            '我询问款式与尺码的对应关系，并明确会在样品清单中标注款式和尺码。确认更多要求后，我把混款类型与年龄范围重新汇总给客户核对。',
            '聊包装时，件、套和体积的说法没有完全对上，所以这里没有采用那些容量数字。'
          ],[pair(img('india','india-size-confirmation','我逐款确认尺码，并回复在样品清单中标注款式与尺码。'),img('india','india-age-confirmation','我复述混款与年龄范围，帮助双方确认理解。'))]),
          section('replacement','缺货后，换个相似款试试',[
            '原款缺货后，我先说明情况，再找有库存的相似款发给客户。客户回复了 OK，同意这个替换建议。',
            '这时确认的是替款方案，还没有收到客户的实物验收反馈。'
          ],[picture(img('india','india-replacement','原款缺货、提供在库相似款、客户回复同意的三个连续消息节选。'))]),
          section('followup','继续跟进选样和打包',[
            '我继续跟进选样、打包和下一步安排。目前留有供货端的打包记录；最后几条物流消息还是预计安排，最终发货和清关结果还需要核实。'
          ],[{type:'timeline',items:[{title:'确认范围',text:'我确认混款、类型和年龄范围，交给客户复核。'},{title:'整理选样',text:'我把每款对应的尺码列清楚，方便再次核对。'},{title:'处理缺货',text:'我解释限制并提供相似款，客户回复同意。'},{title:'继续跟进',text:'供货端提供打包记录；最终物流与交付状态仍需核实。'}]}])
        ]
      },
      {
        id:'woven',name:'织物遗境',type:'三人团队 · 四套服装系列',team:'三人团队，四套系列',
        summary:'我参与系列设计和制作跟进，独立做了三套 CLO3D 模型。白坯试穿时发现裤长过长，便和版师重新确认了裤脚位置和尺寸。',
        role:'我负责设计、效果图和制作跟进，独立完成三套 CLO3D 模型；过程中接受老师建议，版师负责相应制版与修改。',
        status:'这里展示两套现存的模拟图。版师已修改裤长，但我没有再次试穿，改后的上身效果还没复核。',
        deliverables:'系列设计与效果图、三套 CLO3D 模型、制作沟通与120厘米裤长修改要求',
        cover:img('woven','design','三人团队四套系列的设计板局部；我的分工见下方说明。'),
        abilities:{concept:'concept',modeling:'models',sample:'fitting',communication:'fitting',workflow:'handoff'},
        sections:[
          section('concept','系列主题从哪里来',[
            '系列设想了一位穿过文明遗迹的极地行者，灵感来自浙江竹编和良渚文化。我们尝试用布条编织表现竹编结构，也在设计中加入了良渚爪纹元素。',
            '我们三人共同完成四套系列。我参与设计、效果图和制作跟进，把编织的想法落实到服装造型中。'
          ]),
          section('models','用三维模拟检查造型',[
            '我独立完成三套 CLO3D 模型，参考教程处理编织结构，并对编织结构调整三轮，过程中接受老师建议。本页选择目前能够对应确认的两套正、背、侧视图。',
            '下面两张组图分别是两套造型的正、背、侧视图，可以对照着看比例和结构细节，画面都来自数字模拟。'
          ],[picture(img('woven','model-a','模型一的正、背、侧视图，由我完成的 CLO3D 数字模拟。')),picture(img('woven','model-b','模型二的正、背、侧视图；与模型一是不同造型。'))]),
          section('fitting','白坯试穿：把“轻微堆叠”说清楚',[
            '我亲自试穿白坯时发现裤长过长。与版师沟通后，了解到他依据效果图增加了裤脚堆积；我们对堆叠程度的理解不同。',
            '我重新说明，希望裤脚到鞋面，只留一点堆叠。结合试穿测量，也参考了网上的裤长，我提出改到120厘米。版师后来改了，但我没有再次试穿，还没确认改后的上身效果。'
          ],[{type:'info',rows:[{label:'发现',value:'我在亲自试穿中发现裤长过长'},{label:'澄清',value:'版师按效果图增加堆积；我说明预期为到鞋面、轻微堆叠'},{label:'修改要求',value:'结合测量与辅助参考，明确提出裤长120厘米'},{label:'状态',value:'版师已修改；我没有再次试穿，还没确认改后效果'}]}]),
          section('handoff','和工作室确认制作细节',[
            '我和工作室说明需求、预算，讨论细节工艺和面料改造的做法，再继续确认面料。我负责沟通、核对和跟进，实际制版和修改由版师完成。'
          ])
        ]
      },
      {
        id:'suit',name:'西装纸样与成衣',type:'服装结构与制作练习',
        summary:'这套西装由我独立设计、制版和缝制。可以对照纸样与成衣，看看结构图最后做成了什么样。',
        role:'我独立完成西装的设计、制版与缝制。',
        status:'已完成西装纸样与成衣，本页展示同款成衣的正、侧、背视图。',deliverables:'西装纸样、成衣及正、侧、背视图',
        cover:img('suit','front','西装成衣正面，展示驳领、门襟与整体比例。'),abilities:{pattern:'pattern'},
        sections:[section('pattern','从纸样到成衣',[
          '我独立做了这套西装的设计、制版和缝制。下面放了纸样，以及同款成衣的不同角度，可以对照着看驳领、门襟、肩袖和衣身比例。这套灰色西装和男装结构课程里的夹克、衬衫、牛仔裤是不同练习。'
        ],[picture(img('suit','pattern','西装纸样与结构制图，保留原有标注。')),pair(img('suit','side','同款西装侧面，观察肩袖与衣身关系。'),img('suit','back','同款西装背面，与正面、侧面属于同一组视图。'))])]
      },
      {
        id:'huadan',name:'花旦 · 纸样与三维形态',type:'服装结构与数字模拟练习',
        summary:'我完成了花旦的设计、制版、CLO 建模和缝制。这里选了纸样和模型视图，看看各块纸样怎样组成整体造型。',
        role:'我独立完成花旦的设计、制版、CLO建模与缝制，老师在过程中给予指导。',
        status:'已完成设计与制作；本页选展纸样和三维模型，模型画面为数字模拟。',deliverables:'设计、纸样、CLO三维模型与制作成果',
        cover:img('huadan','model','花旦三维模型的正背视图，属于数字模拟。'),abilities:{pattern:'pattern',modeling:'model'},
        sections:[section('pattern','先看纸样怎么分片',[
          '设计、制版、CLO 建模和缝制都由我独立完成，老师在过程中给予指导。下面的纸样保留了分片和制图标注，可以和模型对照着看。'
        ],[picture(img('huadan','pattern','花旦对应纸样；二维结构与三维造型分别标注。'))]),section('model','再看模型的正面和背面',[
          '我用 CLO 做出模型，查看正背造型、层次和体积。这里的图片是数字模拟，实物制作没有用模型图代替。'
        ])]
      },
      {
        id:'mens-structure',name:'男装结构课程 · 夹克、衬衫与牛仔裤',type:'个人署名课程作业',time:'2026年6月',
        summary:'这份课程作业包括夹克、牛仔衬衫和牛仔裤。我把效果图、款式图、尺寸和结构图整理在一起展示。',
        role:'我完成并提交了这份男装结构课程作业，内容包括效果图、款式图、尺寸规格和结构图。',
        status:'已完成课程作业，保留了设计图和结构图。',deliverables:'夹克、牛仔衬衫、牛仔裤的款式与结构资料',
        cover:img('mens-structure','concept','课程效果图：米色夹克、牛仔衬衫与牛仔裤，不是成衣实拍。'),abilities:{pattern:'pattern'},
        sections:[section('pattern','从款式图画到结构图',[
          '我整理了夹克、牛仔衬衫和牛仔裤的款式图、尺寸与结构图。下面选了款式总览，以及较清晰的衬衫衣身和袖片结构图，方便对照。',
          '这份作业和灰色西装是两个项目，这里展示的是课程里的设计和制图。'
        ],[picture(img('mens-structure','flats','三类男装的正背款式图，来自同一份署名课程作业。')),pair(img('mens-structure','shirt-pattern','牛仔衬衫衣身结构图，选用较清晰的原文档图片。'),img('mens-structure','sleeve-pattern','同作业的袖片与领部结构，支持放大查看标注。'))])]
      },
      {
        id:'draping',name:'立裁 · 褶裥与体积练习',type:'立体裁剪课程练习',
        summary:'我在人台上做立裁，尝试用包裹和褶裥做出不同的体积。照片记录了这次练习的结果。',
        role:'我独立完成立裁练习与制作。',
        status:'已完成独立立裁练习，照片展示人台上的褶裥、包裹与体积。',deliverables:'立裁练习成果及人台展示照片',
        cover:img('draping','draping','人台立裁练习结果，展示褶裥与体积关系。'),abilities:{pattern:'form'},
        sections:[section('form','在人台上试着做出形状',[
          '这次立裁由我独立完成。我在人台上调整面料的包裹和褶裥，观察它们怎样改变整体形状。'
        ])]
      },
      {
        id:'hm',name:'H&M 绍兴门店调研',type:'课程小组 · 问卷与门店研究',time:'2026年4月',
        summary:'我们选了绍兴两家熟悉的 H&M 门店做课程调研。我制作问卷，和组员一起观察、统计，再讨论建议。',
        role:'我制作问卷；观察与统计由小组共同完成，建议共同讨论。我提出试衣间附近提供搭配提示。',
        status:'已完成课程调研资料和建议。我提出的搭配提示还没有细化或实施，也没有后续效果数据。',deliverables:'消费者问卷、共同观察与统计资料、研究问题与建议',
        cover:{src:'assets/projects/hm/questionnaire.svg',alt:'H&M消费者问卷真实字段节选重新排版',caption:'我制作的匿名问卷节选，依据原文重新排版，没有新增或推算调查结果。'},abilities:{research:'research',information:'information'},
        sections:[section('research','问卷里，我想了解什么',[
          '小组选择绍兴两家熟悉的 H&M 门店开展课程研究。我制作消费者问卷，围绕购买渠道、频率、原因、关注因素、价格与穿着场景设置问题。',
          '我提出在试衣间附近提供搭配提示，但没有继续细化或实施。我也担心增加服务介入会打扰浏览，因此需要区分主动推销与顾客主动咨询后的响应。'
        ]),section('information','这次调研里，我做了什么',[
          '问卷由我制作，门店观察、统计和建议讨论由小组一起完成。下面保留了原问卷的问题和具体分工。',
          '我提出在试衣间附近放搭配提示，不过当时没有继续细化和实施，所以还不知道实际效果。'
        ],[{type:'info',rows:[{label:'我完成',value:'消费者问卷制作；提出试衣间附近的搭配提示'},{label:'共同完成',value:'两家门店观察、统计与建议讨论'},{label:'尚未实施',value:'搭配提示未细化落地；无服务或经营改善数据'}]}])]
      },
      {
        id:'tiaogua',name:'跳呱 1934',type:'铁皮青蛙二创 · AI辅助视觉项目',
        summary:'我以铁皮青蛙为原型，加入蒸汽朋克和1934年老上海的想象，做了一组角色、应用概念和视频。',
        role:'我确定原型和主题，用 AI 辅助制作角色与应用画面，并制作成片。角色是在铁皮青蛙基础上的二次创作。',
        status:'已完成角色形象、表情动作、应用概念和视频。项目参赛但未获奖，三视图是视觉概念，没有制作真实三维模型。',deliverables:'二创角色视觉、色彩与表情、文创概念、动态成片',
        cover:img('tiaogua','main','跳呱角色视觉，铁皮青蛙二创与 AI 辅助概念。'),abilities:{concept:'concept',visual:'system','ai-motion':'motion'},
        sections:[section('concept','铁皮青蛙的新故事',[
          '我从铁皮青蛙出发，想象它来到1934年的老上海，再加入蒸汽朋克的机械元素，这就是“跳呱1934”的主题。角色画面有 AI 参与制作。',
          '原海报里放了原型、灵感和最后的形象。机械发条、金色星眸和胸前的爱心，是这版角色想保留的几个特点。'
        ],[picture(img('tiaogua','concept','原型与主题线索节选：铁皮青蛙、蒸汽朋克与老上海。'))]),section('system','给跳呱做表情和应用',[
          '我围绕同一个角色做了配色、表情动作和应用概念，这里选了几张代表作品。文创和产品图都停留在概念阶段，还没有生产或售卖。'
        ],[pair(img('tiaogua','expressions','同一角色的代表性表情与动作，AI辅助视觉。'),img('tiaogua','applications','文创应用概念节选，不是实物产品。'))]),section('motion','把跳呱做成一段视频',[
          '视频把铁皮青蛙原型、机械元素和角色画面串在一起。现在保留的是成片，生成和剪辑过程没有完整留档。'
        ],[{type:'video',src:'assets/projects/tiaogua/film.mp4',poster:'assets/projects/tiaogua/poster.jpg',caption:'跳呱动态成片，约1分31秒；AI辅助二创，不是实拍玩具或真实三维模型演示。'}])]
      },
      {
        id:'swim',name:'地中海与热带花卉 · 亲子泳装图案',type:'图案设计课程 · 主题与应用概念',
        summary:'课程设想了海边度假、酒店泳池和亲子旅拍的场景。我围绕这些场景，整理了两组图案、配色和款式。',
        role:'我整理了课程中的目标人群、主题、图案、色组和款式应用，这里展示的是设计概念。',
        status:'已完成课程图案和款式概念。目前没有印花打样、实物成衣或市场验证资料。',deliverables:'两组主题图案、色板、成人与儿童款式线稿',
        cover:img('swim','image6','地中海主题图案概念，非实际面料打样。'),abilities:{research:'audience',concept:'themes',visual:'application'},
        sections:[section('audience','先想一想，谁会在哪里穿',[
          '课程设定的是25—40岁妈妈和3—10岁女童，场景包括海边度假、酒店泳池和亲子旅拍。我根据这些设定选择主题；这组人群范围是课程假设，没有做过市场验证。'
        ]),section('themes','地中海和热带花卉，两种感觉',[
          '一组用了地中海的蓝白建筑、海洋和明快点色，另一组用了热带植物、花卉和自然色。下面放了图案和色板，可以一起看配色。'
        ],[pair(img('swim','image7','地中海主题另一图案版本，课程概念素材。'),img('swim','image8','热带叶片与花卉图案概念。')),picture(img('swim','image10','原课程地中海色板，用于说明配色设定。'))]),section('application','把图案用到亲子款式上',[
          '我画了成人和儿童的款式线稿，用同一主题的图案和颜色呼应亲子场景。这些是应用概念，还不是实物成衣或印花效果。'
        ],[pair(img('swim','image4','成人泳装款式线稿。'),img('swim','image5','儿童泳装款式线稿。'))])]
      },
      {
        id:'product-video',name:'AI 商品视频练习',type:'AI生成 · 商品动态表达练习',
        summary:'这里放了两段 AI 童装商品视频，可以看到整体搭配、局部和背面的镜头。',
        role:'这两段成片由我提供。目前没有完整保留工具、提示词和修改记录，所以这里只展示最终视频。',
        status:'已完成两段 AI 商品概念视频，画面由 AI 生成。',deliverables:'两段商品动态成片',
        cover:{src:'assets/projects/product-video/poster-b.jpg',alt:'AI生成小狗针织背心童装视频封面',caption:'小狗针织背心视频的封面，画面由 AI 生成。'},abilities:{'ai-motion':'films'},
        sections:[section('films','两段成片，分别看看',[
          '第一段是蓝色拼接衬衫配白色内搭；第二段是米棕色小狗针织背心，搭白衬衫和牛仔裤。两段各自保留了完整视频。',
          '画面由 AI 生成，面料、结构和细节仅供看视觉效果，实际商品的质量和性能还需要实物检查。'
        ],[{type:'video',src:'assets/projects/product-video/film-a.mp4',poster:'assets/projects/product-video/poster-a.jpg',caption:'蓝色拼接衬衫商品视频，约12秒，AI生成。'},{type:'video',src:'assets/projects/product-video/film-b.mp4',poster:'assets/projects/product-video/poster-b.jpg',caption:'小狗针织背心商品视频，约14秒，AI生成；包含正面与背面镜头。'}])]
      }
    ],
    honors:[
      {name:'单项奖学金',organizer:'校内评定',level:'校级',time:'2023—2024学年'},
      {name:'优秀干事',organizer:'校内评定',level:'校级',time:'2023—2024学年'},
      {name:'综合奖学金',organizer:'校内评定',level:'三等奖',time:'2024—2025学年'},
      {name:'优秀干事',organizer:'校内评定',level:'校级',time:'2024—2025学年'},
      {name:'综合奖学金',organizer:'校内评定',level:'二等奖',time:'2025—2026学年'},
      {name:'优秀团干部',organizer:'校内评定',level:'校级',time:'2025—2026学年'},
      {name:'优秀学生干部',organizer:'校内评定',level:'校级',time:'2025—2026学年'}
    ],
    skills:[
      {title:'服装设计与制作',color:'red',confirmed:['服装结构与纸样','立体裁剪','面料比较','制作沟通与样品跟进']},
      {title:'数字设计与内容制作',color:'blue',confirmed:['CLO3D建模与模拟','图案与视觉概念','AI辅助视觉表达','短视频制作']},
      {title:'办公与业务整理',color:'teal',confirmed:['需求确认','面料表与尺寸资料','工艺单整理','问卷制作','订单节点跟进']}
    ],
    contact:{email:'18756369719@163.com',phone:'',wechatId:'18756369719',wechat:'',resume:'',portrait:{src:'assets/contact-portrait.png',alt:'梅子甜双手托腮的半身照',width:1086,height:1448}}
  };
})();

// ASSET_DIMENSIONS: generated from selected display files.
window.PORTFOLIO.mediaSizes = {"assets/projects/lebanon/lebanon-requirement.webp":[476,121],"assets/projects/lebanon/lebanon-swatches.webp":[641,361],"assets/projects/lebanon/lebanon-fabric-table.webp":[822,315],"assets/projects/lebanon/lebanon-button-discussion.webp":[294,373],"assets/projects/lebanon/lebanon-size-diagram.webp":[348,318],"assets/projects/lebanon/lebanon-order.webp":[350,244],"assets/projects/lebanon/lebanon-heart-status.webp":[499,419],"assets/projects/india/india-mixed-request.webp":[537,278],"assets/projects/india/india-size-confirmation.webp":[490,238],"assets/projects/india/india-age-confirmation.webp":[496,371],"assets/projects/india/india-replacement.webp":[407,237],"assets/projects/india/india-packing.webp":[267,355],"assets/projects/suit/front.webp":[1086,1448],"assets/projects/suit/back.webp":[814,1086],"assets/projects/suit/pattern.webp":[1062,886],"assets/projects/huadan/model.webp":[2200,1834],"assets/projects/huadan/pattern.webp":[1725,785],"assets/projects/draping/draping.webp":[1279,1882],"assets/projects/mens-structure/concept.webp":[1024,1536],"assets/projects/mens-structure/flats.webp":[1312,1199],"assets/projects/mens-structure/shirt-pattern.webp":[1423,1849],"assets/projects/woven/model-a.webp":[2184,859],"assets/projects/woven/model-b.webp":[2184,859],"assets/projects/woven/design.webp":[2200,1509],"assets/projects/swim/image6.webp":[523,523],"assets/projects/swim/image7.webp":[521,521],"assets/projects/swim/image8.webp":[541,541],"assets/projects/songjian/identity.webp":[2048,2048],"assets/projects/songjian/concept.webp":[324,625],"assets/projects/songjian/store.webp":[758,517],"assets/projects/suit/side.webp":[814,1086],"assets/projects/mens-structure/sleeve-pattern.webp":[1278,1795],"assets/projects/swim/image4.webp":[868,727],"assets/projects/swim/image5.webp":[694,582],"assets/projects/swim/image10.webp":[1346,760],"assets/projects/hm/questionnaire.svg":[1200,820],"assets/projects/tiaogua/main.webp":[1800,926],"assets/projects/tiaogua/concept.webp":[1730,600],"assets/projects/tiaogua/expressions.webp":[1758,940],"assets/projects/tiaogua/applications.webp":[1800,503],"assets/projects/tiaogua/poster.jpg":[720,1280],"assets/projects/product-video/poster-a.jpg":[1280,720],"assets/projects/product-video/poster-b.jpg":[1280,720]};
