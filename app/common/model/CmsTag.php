<?php

namespace app\common\model;

use think\Model;

class CmsTag extends Model
{
    protected $autoWriteTimestamp = 'datetime';

    public static function onBeforeInsert($data)
    {
        if (empty($data['sort'])) {
            $data['sort'] = static::max('sort') + 5;
        }
    }
}
