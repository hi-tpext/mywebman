<?php

namespace cooladmin\common;

use tpext\common\Resource as baseResource;
use tpext\myadmin\common\Module as adminModule;

class Resource extends baseResource
{
    protected $version = '1.0.2';

    protected $name = 'cool.admin';

    protected $title = 'Cool-Admin';

    protected $description = '基于[Vue+Element]COOL-ADMIN样式UI';

    protected $root = __DIR__ . '/../';

    protected $assets = 'assets';

    public function loaded()
    {
        $indexView = $this->getRoot() . implode(DIRECTORY_SEPARATOR, ['admin', 'view', 'index', 'index.html']);
        $loginView = $this->getRoot() . implode(DIRECTORY_SEPARATOR, ['admin', 'view', 'index', 'login.html']);

        adminModule::getInstance()->addIndexView($indexView, 'COOL-ADMIN样式');
        adminModule::getInstance()->addLoginView($loginView, 'COOL-ADMIN样式');
    }
}
