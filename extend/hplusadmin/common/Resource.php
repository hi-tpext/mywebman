<?php

namespace hplusadmin\common;

use tpext\common\Resource as baseResource;
use tpext\myadmin\common\Module as adminModule;

class Resource extends baseResource
{
    protected $version = '1.0.6';

    protected $name = 'hplus.admin';

    protected $title = 'H+admin后台主框架模板样式';

    protected $description = '提供[H+admin]相关样式资源，主要改变主框架[/admin/index/index]的样式';

    protected $root = __DIR__ . '/../';

    protected $assets = 'assets';

    public function loaded()
    {
        $indexView = $this->getRoot() . implode(DIRECTORY_SEPARATOR, ['admin', 'view', 'index', 'index.html']);
        $loginView = $this->getRoot() . implode(DIRECTORY_SEPARATOR, ['admin', 'view', 'index', 'login.html']);

        adminModule::getInstance()->addIndexView($indexView, 'H+后台模板');
        adminModule::getInstance()->addLoginView($loginView, 'H+后台模板');
    }
}
