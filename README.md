# 欢迎使用

## 一、安装

### 框架需要使用 composer和git

安装 `composer`

<https://pkg.phpcomposer.com/#how-to-install-composer/>

安装 `git`

<https://git-scm.com/>

### 方式一、使用 `composer` 全新安装

安装 [webman] 和 [tpextmyadmin] https://github.com/hi-tpext/tpextmyadmin/tree/4.0

```bash
composer create-project workerman/webman mywebman

cd mywebman

composer require ichynul/tpextmyadmin:^4.0.6
```

> 安装完毕，此安装版是最小模式，只包含基本的后台功能，建议开发新项目时使用此方式。

---

### 方式二、使用 `git` 安装演示站

> git拉取，依次执行以下命令，`mywebman` 为新项目目录，可自行调整

```bash
git clone https://github.com/hi-tpext/mywebman.git mywebman

cd mywebman

composer update
```

> 相关演示代码在<https://github.com/hi-tpext/mywebman> `app/admin/`中，数据库脚本由`[myadmindata]`扩展提供，请下载安装。

> 安装完毕，此安装版是最和演示站同步的，如果你想自己搭建演示站可用此方式。

> 注意：此方式的仓库是不带`composer`依赖`vendor`目录的，请务必运行`composer update`安装所有依赖后再访问网站。

## webman1.4.x

新版本默认开启控制器后缀：`'controller_suffix' => 'Controller',`

请关闭它，在`config/app.php`中修改为：

`'controller_suffix' => '',`

## 二、配置

- 在`/config/thinkorm.php`中配置数据库，或在网页中配置[见下一步]

## 三、扩展安装

1. 浏览器输入 [`http://localhost:8787/admin`] 打开，如果没有事先配置数据库，将会跳转到配置数据库的页面(若不能正常跳，配置数据库后再试)。

2. 自动安装基础扩展

3. 手动安装 [`tpext.myadmin`]，确保此扩展优先，以支持其他扩展的后台菜单创建

    默认账号：`admin`：`tpextadmin`

    安装成功后自动创建id为1的超级管理员，并处于登录状态。

4. 手动安装其余装扩展

## 四、登录后台

- 浏览器再次输入[`http://localhost:8787/admin`]打开，进入后台主页。

---

### 一些问题

#### 运行目录

传统的php-fpm一般是以 `public` 作为启动目录，为保持兼容，建议进入 `public` 目录执行启动命令：

[linux]

启动：
```bash
cd public
php ../start.php start
```

[windows]

启动：
```bash
cd public
php ..\windows.php
```

或修改把 `windows.bat` 移入 `public` 目录并修改内容：

```bash
CHCP 65001
php ..\windows.php
pause
```

启动：
```bash
cd public
.\windows.bat
```
---

#### extend

extend扩展基于`composer.josn`配置

初次安装会自动修改`composer。json`（命令行会提示：`注册扩展目录:extend/成功,composer.json文件已修改`），但修改后仍然需要下次运行`composer`相关命名才生效。

如果下载extend插件不能识别，提示:
```
执行出错：
未匹配到扩展
```
暂时解决办法删除`vendor`中的某个依赖，然后运行`composer u`重新下载，之后使`extend`生效。

比如可以删除`vendor/ichynul`。

---

## 五、文档

<https://gxzrnxb27j.k.topthink.com/@tpext-docs/about.html>

## 六、演示

### 网址

1. [tp6.1] <http://gaosu.shenzhuo.vip:50469/admin>

2. [webman] <http://gaosu.shenzhuo.vip:50468/admin>

### 账号

`admin`：`tpextadmin`

### 注意事项

- 请不要乱修改数据
- 请不要上传非法内容或图片
- 请不要上传您的重要数据到上面以防泄漏
- 有问题请联系：ichynul#163.com (#换@)，或通过群联系。
- 演示网站偶尔不稳定，会定期重启

## 七、功能特性

1.模块化开发，核心功能都是通过 `composer` 安装的

### 主要扩展依赖

- [tpext] <https://www.gitlink.org.cn/hi-tpext/tpext> 扩展核心
- [tpextbuilder] <https://www.gitlink.org.cn/hi-tpext/tpextbuilder> UI 生成器
- [tpextmanager] <https://www.gitlink.org.cn/hi-tpext/tpextmanager> 管理工具
- [lightyearadmin]<https://www.gitlink.org.cn/hi-tpext/lightyearadmin> 基础样式库
- [tpextmyadmin] <https://www.gitlink.org.cn/hi-tpext/tpextmyadmin> 集成后台基础功能：权限、设置等
- [更多] <https://www.gitlink.org.cn/hi-tpext/extensions/tree/main/extensions.json> 查看全部扩展介绍

2.`tpextbuilder`UI模块基于`bootstrap`和`Light-Year-Admin-Template`的后台模板， 封装了大部分常用组件 ：

`Column`、`Row`、`Tab`、`Table`、`Form`、`Toolbar`、`Layer`、`Content`

3.`HasBuilder` 封装了常用操作，可供控制器引入使用

Thinkphp版：https://github.com/hi-tpext/myadmin

webman插件主页：<https://www.workerman.net/plugin/70>

#### 实例

```php
<?php

namespace app\admin\controller;

use app\common\logic\MemberLogic;
use app\common\model;
use think\Controller;
use tpext\builder\traits\HasBuilder;

/**
 * Undocumented class
 * @title 会员管理
 */
class Member extends Controller
{
    use HasBuilder;

    /**
     * Undocumented variable
     *
     * @var model\Member
     */
    protected $dataModel;

    protected function initialize()
    {
        $this->dataModel = new model\Member;
        $this->pageTitle = '会员管理';
        $this->enableField = 'status';
        $this->pagesize = 8;

        /* 作为下拉选择数据源　相关设置 */
        //显示
        $this->selectTextField = '{id}#{nickname}({mobile})';
        //like查询字段，$this->dataModel->where('username|nickname|mobile', 'like', $kwd);
        $this->selectSearch = 'username|nickname|mobile';
    }

    protected function filterWhere()
    {
        $searchData = request()->get();
        $where = [];
        if (!empty($searchData['id'])) {
            $where[] = ['id', 'eq', $searchData['id']];
        }
        if (!empty($searchData['username'])) {
            $where[] = ['username', 'like', '%' . $searchData['username'] . '%'];
        }
        if (!empty($searchData['nickname'])) {
            $where[] = ['nickname', 'like', '%' . $searchData['nickname'] . '%'];
        }
        if (!empty($searchData['mobile'])) {
            $where[] = ['mobile', 'like', '%' . $searchData['mobile'] . '%'];
        }
        if (isset($searchData['status']) && $searchData['status'] != '') {
            $where[] = ['status', 'eq', $searchData['status']];
        }
        if (isset($searchData['level']) && $searchData['level'] != '') {
            $where[] = ['level', 'eq', $searchData['level']];
        }
        if (!empty($searchData['province'])) {
            $where[] = ['province', 'eq', $searchData['province']];
            if (!empty($searchData['city'])) {
                $where[] = ['city', 'eq', $searchData['city']];
                if (!empty($searchData['area'])) {
                    $where[] = ['area', 'eq', $searchData['area']];
                }
            }
        }
        return $where;
    }

    /**
     * 构建搜索
     *
     * @return void
     */
    protected function builSearch()
    {
        $search = $this->search;

        $search->text('id', '会员id')->maxlength(20);
        $search->text('username', '账号')->maxlength(20);
        $search->text('nickname', '昵称')->maxlength(20);
        $search->text('mobile', '手机号')->maxlength(20);
        $search->select('level', '等级')->optionsData(model\MemberLevel::order('level')->select(), 'name', 'level')->afterOptions([0 => '普通会员']);
        $search->select('status', '状态')->options([0 => '禁用', 1 => '正常']);
        $search->select('province', '省份')->dataUrl(url('api/areacity/province'), 'ext_name')->withNext(
            $search->select('city', '城市')->dataUrl(url('api/areacity/city'), 'ext_name')->withNext(
                $search->select('area', '地区')->dataUrl(url('api/areacity/area'), 'ext_name')
            )
        );
    }

    /**
     * 构建表格
     *
     * @return void
     */
    protected function buildTable(&$data = [])
    {
        $table = $this->table;

        $table->show('id', 'ID');
        $table->image('avatar', '头像')->thumbSize(50, 50)->default('/static/images/touxiang.png');
        $table->show('username', '账号');
        $table->text('nickname', '昵称')->autoPost()->getWrapper()->addStyle('width:130px');
        $table->show('mobile', '手机号')->getWrapper()->addStyle('width:100px');
        $table->match('gender', '性别')->options([1 => '男', 2 => '女', 0 => '未知'])->getWrapper()->addStyle('width:50px');
        $table->show('age', '性别');
        $table->show('level_name', '等级');
        $table->show('money', model\MemberAccount::$types['money']);
        $table->show('points', model\MemberAccount::$types['points']);
        $table->show('pca', '省市区');
        $table->switchBtn('status', '状态')->default(1)->autoPost()->getWrapper()->addStyle('width:60px');
        $table->show('last_login_time', '最近登录')->getWrapper()->addStyle('width:150px');
        $table->show('create_time', '注册时间')->getWrapper()->addStyle('width:150px');

        $table->sortable('id,sort,money,points,commission,re_comm,shares,last_login_time');

        $table->getToolbar()
            ->btnAdd()
            ->btnEnableAndDisable('启用', '禁用')
            ->btnRefresh();

        $table->getActionbar()
            ->btnEdit()
            ->btnView()
            ->btnLink('account', url('/admin/memberaccount/add', ['member_id' => '__data.pk__']), '', 'btn-success', 'mdi-square-inc-cash');
    }

    /**
     * 构建表单
     *
     * @param boolean $isEdit
     * @param array $data
     */
    protected function builForm($isEdit, &$data = [])
    {
        $form = $this->form;

        $form->tab('基本信息');
        $form->image('avatar', '头像')->thumbSize(50, 50);
        $form->text('username', '账号')->required()->maxlength(20);
        $form->text('nickname', '昵称')->required()->maxlength(20);
        $form->text('mobile', '手机号')->maxlength(11);
        $form->text('email', '邮件')->maxlength(60);
        $form->number('age', '年龄')->max(100)->min(1)->default(18);
        $form->radio('gender', '性别')->options([0 => '未知', 1 => '男', 2 => '女'])->default(0);

        $form->tab('其他信息');
        $form->textarea('remark', '备注')->maxlength(255);
        $form->switchBtn('status', '状态')->default(1);

        if ($isEdit) {
            $form->show('last_login_time', '最近登录时间');
            $form->show('create_time', '注册时间');
            $form->show('update_time', '修改时间');
        }
    }

    /**
     * 保存数据
     *
     * @param integer $id
     * @return void
     */
    private function save($id = 0)
    {
        $data = request()->only([
            'avatar',
            'username',
            'nickname',
            'mobile',
            'email',
            'gender',
            'age',
            'status',
            'remark',
        ], 'post');

        $result = $this->validate($data, [
            'username|账号' => 'require',
            'nickname|昵称' => 'require',
            'mobile|手机号' => 'mobile',
            'age|年龄' => 'number',
        ]);

        if (true !== $result) {
            $this->error($result);
        }

        return $this->doSave($data, $id);
    }
}
```

## 八、QQ群

<img src="https://images.gitee.com/uploads/images/2021/0527/115851_20d4c40a_306213.jpeg" width="180" style="width:180px;" />

## 九、效果展示

![alt 1](https://gitee.com/tpext/myadmin/raw/5.1/images/1.png "1")
![alt 2](https://gitee.com/tpext/myadmin/raw/5.1/images/2.png "2")
![alt 3](https://gitee.com/tpext/myadmin/raw/5.1/images/3.png "3")
![alt 4](https://gitee.com/tpext/myadmin/raw/5.1/images/4.png "4")
![alt 5](https://gitee.com/tpext/myadmin/raw/5.1/images/5.png "5")
![alt 6](https://gitee.com/tpext/myadmin/raw/5.1/images/6.png "6")
![alt 7](https://gitee.com/tpext/myadmin/raw/5.1/images/7.png "7")
![alt 8](https://gitee.com/tpext/myadmin/raw/5.1/images/8.png "8")

## 十、鸣谢

`Tpext` 系列扩展和使用了以下框架技术或受到其启发：

- webman
- Thinkphp
- Botstrap
- Lightyear-admin
- Laravel-admin
- Jquery
- Layer
- Bootstrap-number-input
- Bootstrap-duallistbox
- Bootstrap-datepicker
- Bootstrap-daterangepicker
- Bootstrap-colorpicker
- Bootstrap-maxlength
- Bootstrap-touchspin
- Webuploader
- FontIconPicker
- Select2
- Dropzone
- ZTree
- Jstree
- CKEditor
- Editormd
- Tinymce
- UEditor
- WangEditor
- AreaCity-JsSpider-StatsGov
- 等

## 十一、License

Apache2
