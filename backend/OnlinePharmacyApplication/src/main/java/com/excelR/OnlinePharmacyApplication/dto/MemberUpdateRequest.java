package com.excelR.OnlinePharmacyApplication.dto;

import jakarta.validation.constraints.NotBlank;

public class MemberUpdateRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Mobile is required")
    private String mobile;

    public MemberUpdateRequest() {}

    public MemberUpdateRequest(String name, String email, String mobile) {
        this.name = name;
        this.email = email;
        this.mobile = mobile;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }
    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

	public Object getPhone() {
		// TODO Auto-generated method stub
		return null;
	}

	public Object getAddress() {
		// TODO Auto-generated method stub
		return null;
	}
}
