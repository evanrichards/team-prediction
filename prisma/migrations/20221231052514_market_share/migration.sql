-- AlterTable
ALTER TABLE `user` MODIFY `last_login` DATETIME(3) NULL;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_email_key` TO `user_email_key`;
