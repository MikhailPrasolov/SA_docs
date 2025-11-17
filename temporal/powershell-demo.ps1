# Simple Temporal OMS Demo for PowerShell
# Runs without Node.js installation

Write-Host "Temporal OMS Demo - PowerShell Version" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

# Simulate Order Workflow process
function Start-OrderWorkflow {
    param(
        [string]$OrderId,
        [bool]$ShouldCancel = $false
    )
    
    Write-Host "Starting order processing: $OrderId" -ForegroundColor Yellow
    
    $status = "CREATED"
    $history = @()
    
    try {
        # Step 1: Inventory Check
        Write-Host "Checking inventory..." -ForegroundColor Gray
        Start-Sleep -Seconds 1
        $status = "INVENTORY_CHECKED"
        $history += "Inventory checked"
        Write-Host "Inventory: Items available" -ForegroundColor Green
        
        # Simulate cancellation
        if ($ShouldCancel) {
            Write-Host "Signal: Customer cancelled order" -ForegroundColor Red
            return @{
                Success = $false
                OrderId = $OrderId
                Status = "CANCELLED"
                Reason = "Customer changed mind"
            }
        }
        
        # Step 2: Payment Processing
        Write-Host "Processing payment..." -ForegroundColor Gray
        Start-Sleep -Seconds 1.5
        $status = "PAYMENT_PROCESSED"
        $history += "Payment processed"
        Write-Host "Payment: Success" -ForegroundColor Green
        
        # Step 3: Order Preparation
        Write-Host "Preparing for shipment..." -ForegroundColor Gray
        Start-Sleep -Seconds 1
        $status = "PREPARING_FOR_SHIPMENT"
        $history += "Order prepared"
        Write-Host "Preparation: Order packaged" -ForegroundColor Green
        
        # Step 4: Shipping
        Write-Host "Shipping order..." -ForegroundColor Gray
        Start-Sleep -Seconds 1
        $status = "SHIPPED"
        $trackingNumber = "TRK" + (Get-Random -Maximum 999999999).ToString("D9")
        $history += "Order shipped"
        Write-Host "Shipping: Tracking number $trackingNumber" -ForegroundColor Green
        
        # Step 5: Delivery
        Write-Host "Delivering order..." -ForegroundColor Gray
        Start-Sleep -Seconds 2
        $status = "DELIVERED"
        $history += "Order delivered"
        Write-Host "Delivery: Order received by customer" -ForegroundColor Green
        
        return @{
            Success = $true
            OrderId = $OrderId
            Status = $status
            TrackingNumber = $trackingNumber
            History = $history
        }
        
    } catch {
        Write-Host "Workflow error: $_" -ForegroundColor Red
        return @{
            Success = $false
            OrderId = $OrderId
            Status = "CANCELLED"
            Error = $_.Exception.Message
        }
    }
}

# Demo Activity functions
function Show-ActivitiesDemo {
    Write-Host "Demo: Activity Functions" -ForegroundColor Yellow
    Write-Host "------------------------" -ForegroundColor Cyan
    
    $activities = @(
        @{Name = "checkInventory"; Description = "Check inventory"},
        @{Name = "processPayment"; Description = "Process payment"},
        @{Name = "prepareForShipment"; Description = "Prepare for shipment"},
        @{Name = "shipOrder"; Description = "Ship order"},
        @{Name = "notifyCustomer"; Description = "Notify customer"},
        @{Name = "cancelOrder"; Description = "Cancel order"}
    )
    
    foreach ($activity in $activities) {
        Write-Host "Activity: $($activity.Description)" -ForegroundColor Gray
        Start-Sleep -Milliseconds 300
    }
}

# Main demo function
function Start-Demo {
    Write-Host "Demo 1: Successful Order Processing" -ForegroundColor Yellow
    Write-Host "------------------------------------" -ForegroundColor Cyan
    
    $result1 = Start-OrderWorkflow -OrderId "ORD_001" -ShouldCancel $false
    
    Write-Host "Order 1 Result:" -ForegroundColor Magenta
    $result1 | Format-List | Out-String | Write-Host
    
    Write-Host "Demo 2: Order Cancellation" -ForegroundColor Yellow
    Write-Host "---------------------------" -ForegroundColor Cyan
    
    $result2 = Start-OrderWorkflow -OrderId "ORD_002" -ShouldCancel $true
    
    Write-Host "Order 2 Result:" -ForegroundColor Magenta
    $result2 | Format-List | Out-String | Write-Host
    
    # Show Activity functions
    Show-ActivitiesDemo
    
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "Demo Completed!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    
    Write-Host "Temporal Concepts:" -ForegroundColor Cyan
    Write-Host "1. Workflow - Long-running business process" -ForegroundColor White
    Write-Host "2. Activity - Individual business operations" -ForegroundColor White
    Write-Host "3. Reliability - Continue after failures" -ForegroundColor White
    Write-Host "4. Observability - Full execution history" -ForegroundColor White
    Write-Host "5. Flexibility - Easy to add new steps" -ForegroundColor White
    
    Write-Host "For full demo:" -ForegroundColor Yellow
    Write-Host "Open browser-demo.html in browser" -ForegroundColor White
    Write-Host "Or install Node.js and run simple-demo.js" -ForegroundColor White
}

# Start demo
Start-Demo