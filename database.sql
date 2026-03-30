-- ==========================================
-- AB STUDIO - MySQL Database Schema
-- ==========================================
-- 
-- Instructions:
-- 1. Create a new database named 'abstudio_db' (or your preferred name)
-- 2. Run this SQL file to create all required tables
-- 3. Update api/config.php with your database credentials
--
-- Command to import:
-- mysql -u your_username -p abstudio_db < database.sql
--
-- Or use phpMyAdmin to import this file
-- ==========================================

-- Set character set
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ==========================================
-- TABLE: users
-- Stores customer and admin user information
-- ==========================================
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL COMMENT 'Full name of the user',
    `email` VARCHAR(100) NOT NULL COMMENT 'Email address (unique)',
    `password` VARCHAR(255) NOT NULL COMMENT 'Hashed password',
    `phone` VARCHAR(20) DEFAULT NULL COMMENT 'Phone number',
    `role` ENUM('customer', 'admin') DEFAULT 'customer' COMMENT 'User role',
    `status` ENUM('active', 'inactive', 'banned') DEFAULT 'active' COMMENT 'Account status',
    `email_verified` TINYINT(1) DEFAULT 0 COMMENT 'Email verification status',
    `last_login` DATETIME DEFAULT NULL COMMENT 'Last login timestamp',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_email` (`email`),
    KEY `idx_role` (`role`),
    KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='User accounts table';

-- ==========================================
-- TABLE: orders
-- Stores design orders from customers
-- ==========================================
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `tracking_id` VARCHAR(20) NOT NULL COMMENT 'Unique tracking ID (e.g., AB-1001)',
    `user_id` INT(11) UNSIGNED DEFAULT NULL COMMENT 'Linked user ID (if registered)',
    `customer_name` VARCHAR(100) NOT NULL COMMENT 'Customer full name',
    `customer_phone` VARCHAR(20) DEFAULT NULL COMMENT 'Customer phone number',
    `customer_email` VARCHAR(100) DEFAULT NULL COMMENT 'Customer email',
    `service_name` VARCHAR(100) NOT NULL COMMENT 'Service type (Logo, Social Media, etc.)',
    `design_details` TEXT DEFAULT NULL COMMENT 'Additional design requirements',
    `design_size` VARCHAR(50) DEFAULT NULL COMMENT 'Design dimensions (A4, 1080x1080, etc.)',
    `file_format` VARCHAR(20) DEFAULT 'PNG' COMMENT 'Output file format',
    `delivery_method` VARCHAR(20) DEFAULT 'WhatsApp' COMMENT 'Delivery method',
    `print_mood` VARCHAR(20) DEFAULT NULL COMMENT 'Print type (OFFSET/DIGITAL)',
    `price` DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT 'Order price in LKR',
    `status` ENUM('Pending', 'Designing', 'Review', 'Completed', 'Delivered', 'Cancelled') DEFAULT 'Pending' COMMENT 'Order status',
    `status_notes` TEXT DEFAULT NULL COMMENT 'Notes about status changes',
    `design_file_url` VARCHAR(500) DEFAULT NULL COMMENT 'URL to completed design file',
    `customer_file_url` VARCHAR(500) DEFAULT NULL COMMENT 'URL to customer uploaded reference file',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `completed_at` DATETIME DEFAULT NULL COMMENT 'When order was completed',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_tracking_id` (`tracking_id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_status` (`status`),
    KEY `idx_created_at` (`created_at`),
    KEY `idx_service_name` (`service_name`),
    CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Customer orders table';

-- ==========================================
-- TABLE: payments
-- Stores payment and receipt information
-- ==========================================
DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `order_id` INT(11) UNSIGNED NOT NULL COMMENT 'Linked order ID',
    `tracking_id` VARCHAR(20) NOT NULL COMMENT 'Order tracking ID for quick lookup',
    `amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT 'Payment amount in LKR',
    `payment_method` ENUM('bank_transfer', 'cash', 'card', 'other') DEFAULT 'bank_transfer' COMMENT 'Payment method used',
    `receipt_url` VARCHAR(500) DEFAULT NULL COMMENT 'URL to uploaded receipt image',
    `receipt_path` VARCHAR(500) DEFAULT NULL COMMENT 'Server path to receipt file',
    `payment_status` ENUM('pending', 'verified', 'rejected', 'refunded') DEFAULT 'pending' COMMENT 'Payment verification status',
    `verified_by` INT(11) UNSIGNED DEFAULT NULL COMMENT 'Admin who verified the payment',
    `verified_at` DATETIME DEFAULT NULL COMMENT 'When payment was verified',
    `verification_notes` TEXT DEFAULT NULL COMMENT 'Notes about verification',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_order_id` (`order_id`),
    KEY `idx_tracking_id` (`tracking_id`),
    KEY `idx_payment_status` (`payment_status`),
    CONSTRAINT `fk_payments_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_payments_verified_by` FOREIGN KEY (`verified_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Payment records table';

-- ==========================================
-- TABLE: order_status_history
-- Tracks all status changes for orders
-- ==========================================
DROP TABLE IF EXISTS `order_status_history`;
CREATE TABLE `order_status_history` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `order_id` INT(11) UNSIGNED NOT NULL COMMENT 'Linked order ID',
    `tracking_id` VARCHAR(20) NOT NULL COMMENT 'Order tracking ID',
    `old_status` VARCHAR(50) DEFAULT NULL COMMENT 'Previous status',
    `new_status` VARCHAR(50) NOT NULL COMMENT 'New status',
    `notes` TEXT DEFAULT NULL COMMENT 'Status change notes',
    `changed_by` INT(11) UNSIGNED DEFAULT NULL COMMENT 'User who made the change',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_order_id` (`order_id`),
    KEY `idx_tracking_id` (`tracking_id`),
    KEY `idx_created_at` (`created_at`),
    CONSTRAINT `fk_status_history_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_status_history_user` FOREIGN KEY (`changed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Order status change history';

-- ==========================================
-- TABLE: activity_logs
-- System activity logging
-- ==========================================
DROP TABLE IF EXISTS `activity_logs`;
CREATE TABLE `activity_logs` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT(11) UNSIGNED DEFAULT NULL COMMENT 'User who performed the action',
    `action` VARCHAR(100) NOT NULL COMMENT 'Action performed',
    `details` TEXT DEFAULT NULL COMMENT 'Additional details (JSON)',
    `ip_address` VARCHAR(45) DEFAULT NULL COMMENT 'IP address',
    `user_agent` VARCHAR(255) DEFAULT NULL COMMENT 'Browser user agent',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_action` (`action`),
    KEY `idx_created_at` (`created_at`),
    CONSTRAINT `fk_logs_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='System activity logs';

-- ==========================================
-- TABLE: settings
-- Application settings
-- ==========================================
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `setting_key` VARCHAR(100) NOT NULL COMMENT 'Setting identifier',
    `setting_value` TEXT DEFAULT NULL COMMENT 'Setting value',
    `setting_group` VARCHAR(50) DEFAULT 'general' COMMENT 'Setting category',
    `description` VARCHAR(255) DEFAULT NULL COMMENT 'Setting description',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_setting_key` (`setting_key`),
    KEY `idx_setting_group` (`setting_group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Application settings';

-- ==========================================
-- INSERT DEFAULT DATA
-- ==========================================

-- Default admin user (password: admin123 - CHANGE THIS AFTER FIRST LOGIN!)
INSERT INTO `users` (`name`, `email`, `password`, `phone`, `role`, `status`, `email_verified`) VALUES
('Administrator', 'admin@abstudio.lk', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '0766885161', 'admin', 'active', 1);
-- Note: The password hash above is for 'admin123' - Use password_hash('yourpassword', PASSWORD_DEFAULT) to generate new hash

-- Default settings
INSERT INTO `settings` (`setting_key`, `setting_value`, `setting_group`, `description`) VALUES
('site_name', 'AB Studio', 'general', 'Website name'),
('site_email', 'hello@abstudio.lk', 'general', 'Contact email'),
('site_phone', '+94 76 688 5161', 'general', 'Contact phone'),
('site_whatsapp', '+94 70 402 5586', 'general', 'WhatsApp number'),
('bank_name', 'Sampath Bank', 'payment', 'Bank name for transfers'),
('bank_account_name', 'Abhiman Gihan Bandara', 'payment', 'Account holder name'),
('bank_account_number', '1234 5678 9012', 'payment', 'Bank account number'),
('bank_branch', 'Main Branch', 'payment', 'Bank branch'),
('currency', 'LKR', 'payment', 'Default currency'),
('order_prefix', 'AB-', 'orders', 'Order tracking ID prefix'),
('maintenance_mode', '0', 'system', 'Enable maintenance mode (0/1)');

-- ==========================================
-- CREATE VIEWS FOR EASY REPORTING
-- ==========================================

-- View: Order summary with payment info
DROP VIEW IF EXISTS `vw_order_summary`;
CREATE VIEW `vw_order_summary` AS
SELECT 
    o.id,
    o.tracking_id,
    o.customer_name,
    o.customer_phone,
    o.customer_email,
    o.service_name,
    o.price,
    o.status,
    o.created_at,
    o.completed_at,
    p.payment_status,
    p.receipt_url,
    p.verified_at
FROM orders o
LEFT JOIN payments p ON o.id = p.order_id;

-- View: Dashboard statistics
DROP VIEW IF EXISTS `vw_dashboard_stats`;
CREATE VIEW `vw_dashboard_stats` AS
SELECT 
    (SELECT COUNT(*) FROM orders) as total_orders,
    (SELECT COUNT(*) FROM orders WHERE status = 'Pending') as pending_orders,
    (SELECT COUNT(*) FROM orders WHERE status = 'Designing') as designing_orders,
    (SELECT COUNT(*) FROM orders WHERE status IN ('Completed', 'Delivered')) as completed_orders,
    (SELECT COUNT(*) FROM orders WHERE status = 'Cancelled') as cancelled_orders,
    (SELECT COALESCE(SUM(price), 0) FROM orders WHERE status IN ('Completed', 'Delivered')) as total_revenue,
    (SELECT COUNT(*) FROM users WHERE role = 'customer') as total_customers,
    (SELECT COUNT(*) FROM payments WHERE payment_status = 'pending') as pending_payments;

-- ==========================================
-- CREATE STORED PROCEDURES
-- ==========================================

DELIMITER //

-- Procedure: Update order status with history tracking
DROP PROCEDURE IF EXISTS `sp_update_order_status`//
CREATE PROCEDURE `sp_update_order_status`(
    IN p_order_id INT,
    IN p_tracking_id VARCHAR(20),
    IN p_new_status VARCHAR(50),
    IN p_notes TEXT,
    IN p_changed_by INT
)
BEGIN
    DECLARE v_old_status VARCHAR(50);
    
    -- Get current status
    SELECT status INTO v_old_status FROM orders WHERE id = p_order_id;
    
    -- Update order status
    UPDATE orders 
    SET status = p_new_status, 
        status_notes = p_notes,
        updated_at = NOW(),
        completed_at = CASE WHEN p_new_status IN ('Completed', 'Delivered') THEN NOW() ELSE completed_at END
    WHERE id = p_order_id;
    
    -- Log status change
    INSERT INTO order_status_history (order_id, tracking_id, old_status, new_status, notes, changed_by)
    VALUES (p_order_id, p_tracking_id, v_old_status, p_new_status, p_notes, p_changed_by);
END//

-- Procedure: Get order tracking info
DROP PROCEDURE IF EXISTS `sp_get_tracking_info`//
CREATE PROCEDURE `sp_get_tracking_info`(
    IN p_tracking_id VARCHAR(20)
)
BEGIN
    SELECT 
        o.tracking_id,
        o.customer_name,
        o.service_name,
        o.design_details,
        o.price,
        o.status,
        o.status_notes,
        o.created_at,
        o.completed_at,
        p.payment_status,
        p.receipt_url
    FROM orders o
    LEFT JOIN payments p ON o.id = p.order_id
    WHERE o.tracking_id = p_tracking_id;
END//

DELIMITER ;

-- ==========================================
-- RE-ENABLE FOREIGN KEY CHECKS
-- ==========================================
SET FOREIGN_KEY_CHECKS = 1;

-- ==========================================
-- COMPLETION MESSAGE
-- ==========================================
SELECT 'AB Studio database setup completed successfully!' AS message;
SELECT 'Default admin credentials: admin@abstudio.lk / admin123' AS notice;
SELECT 'IMPORTANT: Change the admin password after first login!' AS warning;
