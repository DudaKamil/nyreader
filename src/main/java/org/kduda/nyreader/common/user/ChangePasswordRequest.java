package org.kduda.nyreader.common.user;

import java.io.Serializable;

public class ChangePasswordRequest implements Serializable {
    private String currentPassword;
    private String newPassword;

    public ChangePasswordRequest() {
        super();
    }

    public ChangePasswordRequest(String currentPassword, String newPassword) {
        this.setCurrentPassword(currentPassword);
        this.setNewPassword(newPassword);
    }

    public String getCurrentPassword() {
        return this.currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getNewPassword() {
        return this.newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    @Override
    public String toString() {
        return "ChangePasswordRequest{" +
            "currentPassword='" + currentPassword + '\'' +
            ", newPassword='" + newPassword + '\'' +
            '}';
    }
}
