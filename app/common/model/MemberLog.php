<?php

namespace app\common\model;

use think\Model;

class MemberLog extends Model
{
    protected $autoWriteTimestamp = 'datetime';

    protected $updateTime = false;

    public function getNicknameAttr($value, $data)
    {
        $member = Member::find($data['member_id']);
        return $data['member_id'] . '#' . ($member ? $member['nickname'] : '--');
    }

    public function getUsernameAttr($value, $data)
    {
        $member = Member::find($data['member_id']);
        return $data['member_id'] . '#' . ($member ? $member['username'] : '--');
    }

    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id', 'id');
    }
}
