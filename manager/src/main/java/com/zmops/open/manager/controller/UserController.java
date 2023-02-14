/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.zmops.open.manager.controller;

import com.usthe.sureness.subject.SubjectSum;
import com.usthe.sureness.util.SurenessContextHolder;
import com.zmops.open.common.entity.dto.Message;
import com.zmops.open.manager.pojo.dto.UserInfo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

/**
 * user info controller
 * @author tomsun28
 * @date 18:11 2023-02-14
 */
@Tag(name = "UserInfo API | 用户信息 API")
@RestController()
@RequestMapping(value = "/api/user", produces = {APPLICATION_JSON_VALUE})
@Slf4j
public class UserController {

    @GetMapping("")
    @Operation(summary = "获取登陆用户信息")
    @SuppressWarnings("unchecked")
    public ResponseEntity<Message<UserInfo>> getUserInfo() {
        SubjectSum subjectSum = SurenessContextHolder.getBindSubject();
        List<String> roles = (List<String>) subjectSum.getRoles();
        String username = (String) subjectSum.getPrincipal();
        UserInfo userInfo = UserInfo.builder()
                .username(username)
                .roles(roles)
                .build();
        return ResponseEntity.ok(new Message<>(userInfo));
    }
}
