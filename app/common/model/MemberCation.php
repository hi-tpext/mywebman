<?php

namespace app\common\model;

use think\Model;

class MemberCation extends Model
{
    protected $autoWriteTimestamp = 'datetime';

    protected $updateTime = false;

    public function getNicknameAttr($value, $data)
    {
        $member = Member::find($data['member_id']);
        return $data['member_id'] . '#' . ($member ? $member['nickname'] : '--');
    }
}
