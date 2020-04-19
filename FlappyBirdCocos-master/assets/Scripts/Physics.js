var manager = cc.director.getPhysicsManager();
manager.enabled = true;
cc.director.getCollisionManager().enabled = true; 
//manager.enabledDebugDraw = false;
cc.director.getCollisionManager().enabledDebugDraw = false;

cc.director.getPhysicsManager().debugDrawFlags = 
      0;
    // cc.PhysicsManager.DrawBits.e_aabbBit |
    // cc.PhysicsManager.DrawBits.e_pairBit |
    // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
    //cc.PhysicsManager.DrawBits.e_jointBit |
    //cc.PhysicsManager.DrawBits.e_shapeBit
    ; 